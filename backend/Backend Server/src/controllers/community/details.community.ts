import {asyncHandler,response,error} from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
import {z as zod } from "zod" ;
const prisma = new PrismaClient();

const communities_schema = zod.object({
    communityid : zod.string()
})

const community_details = asyncHandler(async (req,res) => {
    const paresdSchema  = communities_schema.safeParse(req.headers)

    if(!paresdSchema.success) {
        throw new error(400,"Community ID not found");
    }

    const providedCommunityID = paresdSchema.data.communityid;
    try {
        const communityDetails = await prisma.community.findFirst({
            where:{
                id:providedCommunityID
            },
            select:{
                id:true,
                name:true,
                description:true,
                users:true,
                posts:true,
            }
        });
        return res.status(200).json(new response(200,"Community Details : ",communityDetails));
        
    } catch (e) {
        throw new error(500,"Internal server error");
    }
});

export default community_details;

