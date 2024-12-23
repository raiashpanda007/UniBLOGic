import { asyncHandler, response, error } from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
import { z as zod } from 'zod';
const prisma = new PrismaClient();
const removeUserSchema = zod.object({
    communityid: zod.string(),
    userid: zod.string(),
});
const removeUser = asyncHandler(async (req, res) => {
    const parsedData = removeUserSchema.safeParse(req.body);
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
    if(community.adminId === userid){
        return res.status(403).json(new response(403, "Admin cannot be removed", null));
    }
    // is he the valid person 
    const isUserVerified = (community.adminId === req.user?.id) || (userid === req.user?.id);

    if (!isUserVerified) {
        return res.status(403).json(new response(403, "You are not authorized to remove user", null));
    }



    try {
        const updatedCommunity = await prisma.community.update({
            where: {
                id: communityid
            },
            data: {
                users: {
                    disconnect: {
                        id: userid
                    }
                }
            },select:{
                id:true,
                name:true,
                description:true,
                communityLogo:true
            }
        });
        if (updatedCommunity) {
            return res.status(200).json(new response(200, "User removed", updatedCommunity));
        }

    } catch (error) {
        return res.status(500).json(new response(500, "Error removing user", {}));
    }

});
export default removeUser;