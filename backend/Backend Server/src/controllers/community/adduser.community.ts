import {asyncHandler , response , error} from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
import { z as zod } from 'zod';
const prisma = new PrismaClient();
const addUserSchema = zod.object({
    communityid: zod.string(),
    userid: zod.string(),
})
const addUser = asyncHandler(async (req, res) => {
    console.log("Requesting user to join : ",req.body);
    const parsedData = addUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json(new response(400, "Invalid data", parsedData.error));
    }
    const { communityid, userid } = parsedData.data;
    const community = await prisma.community.findUnique({
        where: {
            id: communityid
        }
    });
    if (!community) {
        return res.status(404).json(new response(404, "Community not found", null));
    }

    // is he the valid person
    const isUserVerified = (community.adminId === req.user?.id) || (userid === req.user?.id);

    if(!isUserVerified){
        return res.status(403).json(new response(403, "You are not authorized to add user", null));
    }

    try {
        const updatedCommunity = await prisma.community.update({
            where: {
                id: communityid
            },
            data: {
                users: {
                    connect: {
                        id: userid
                    }
                }
            }
        });
        if (updatedCommunity) {
            return res.status(200).json(new response(200, "User added", null));
        }
    } catch (error) {
        return res.status(500).json(new response(500, "Error adding user", {}));
    }
})

export default addUser;