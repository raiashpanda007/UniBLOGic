import { Response, Request } from "express";
import { asyncHandler, error, response, uploadCloudinary} from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
import { z as zod } from "zod";

const prisma = new PrismaClient();

const createCommunity = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    console.log("Unauthorized access attempt");
    return res.status(401).json(new error(401, "Unauthorized"));
  }
  

  const communitySchema = zod.object({
    name: zod.string().min(3, "Please provide a name").max(255),
    description: zod.string().min(3, "Please provide a description"),
    users: zod.array(zod.string()).nonempty("Please provide correct user IDs"),
  });
  if (typeof req.body.users === "string") {
    req.body.users = JSON.parse(req.body.users);
  }
  const parsed = communitySchema.safeParse(req.body);
  if (!parsed.success) {
    console.log("Invalid data received:", parsed.error.errors);
    return res.status(400).json(
      new error(400, "Invalid data", parsed.error.errors)
    );
  }
  
  const { name, description, users } = parsed.data;
  const { id} = req.user;
  const role = await prisma.user.findFirst({
    where:{
        id,
    }, 
    select :{
        role:true
    }
  })
  console.log("user  id :" ,id,"role : ",role, )
  if (role?.role !== "ADMIN") {
    console.log("Non-admin user attempted to create a community");
    return res
      .status(403)
      .json(new error(403, "Only admins can create communities"));
  }
  
  

  const validUsers = await prisma.user.findMany({
    where: { id: { in: users } },
  });

  if (validUsers.length !== users.length) {
    console.log("Invalid user IDs:", users.filter((userId) => !validUsers.some((user) => user.id === userId)));
    return res
      .status(404)
      .json(new error(404, "One or more user IDs are invalid"));
  }
  // Make sure that the admin is included in the list of users
  if (!users.includes(id)) {
    users.push(id);
  }
  const communityLogo = (req.files as { [fieldname: string]: Express.Multer.File[] })?.['communityLogo']?.[0];
  const communityLogoUrl = communityLogo ? await uploadCloudinary(communityLogo.path) : null;
  try {
    const community = await prisma.community.create({
      data: {

        name: name,
        description,
        adminId:id,
        users: {
          connect: users.map((userId) => ({ id: userId })),
        },
        communityLogo: communityLogoUrl?.secure_url || null,
      },
      include: { users: true },
    });

    return res
      .status(201)
      .json(new response(201, "Community created successfully", community));
  } catch (err) {
    console.log("Error creating community:", err);
    return res.status(500).json(new error(500, "Internal server error"));
  }
});

export default createCommunity;
