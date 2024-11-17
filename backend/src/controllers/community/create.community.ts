import { Response, Request } from "express";
import { asyncHandler, error, response } from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
import { z as zod } from "zod";

const prisma = new PrismaClient();

const createCommunity = asyncHandler(async (req: Request, res: Response) => {
  // Ensure the user is authenticated
  if (!req.user) {
    return res.status(401).json(new error(401, "Unauthorized"));
  }

  // Zod schema for community validation
  const communitySchema = zod.object({
    title: zod.string().min(3, "Please provide a title").max(255),
    description: zod.string().min(3, "Please provide a description").max(255),
    communityLogo: zod.string().min(3, "Please provide a logo").max(255),
    users: zod.array(zod.string().uuid("Invalid user ID format")),
  });

  // Validate the request body
  const parsed = communitySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(
      new error(400, "Invalid data", parsed.error.errors)
    );
  }

  const { title, description, communityLogo, users } = parsed.data;
  const { id: adminId, role } = req.user;

  // Check if the user has admin privileges
  if (role !== "ADMIN") {
    return res.status(403).json(new error(403, "Only admins can create communities"));
  }

  // Ensure all user IDs exist in the database
  const validUsers = await prisma.user.findMany({
    where: { id: { in: users } },
  });
  if (validUsers.length !== users.length) {
    return res
      .status(404)
      .json(new error(404, "One or more user IDs are invalid"));
  }

  // Create the community
  const community = await prisma.community.create({
    data: {
      name: title,
      description,
      communityLogo,
      adminId,
      users: {
        connect: users.map((userId) => ({ id: userId })),
      },
    },
    include: { users: true }, 
  });

  return res
    .status(201)
    .json(new response(201, "Community created successfully", community));
});

export default createCommunity;
