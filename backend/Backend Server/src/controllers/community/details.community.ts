import {asyncHandler,response,error} from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
import {z as zod } from "zod" ;
const prisma = new PrismaClient();

const communities_schema = zod.object({
    communityid : zod.string()
})

const isCurrentUserUser = async (userId:string,communityId:string) => {
    const isUser = await prisma.user.findFirst({
        where:{
            id:userId,
            communities:{
                some:{
                    id:communityId
                }
            }
        }
    })
    if(isUser) return true;

    return false;

}

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
                users:{
                    select:{
                        id:true,
                        username:true,
                        profilePicture:true,
                        name:true
                    }
                },
                posts:true,
                communityLogo:true,
                adminId:true
            }
        });
        if(!req.user || !req.user.id) {
            throw new error(401,"Unauthorized");
        }
        const isJoined = await isCurrentUserUser(req.user.id,providedCommunityID);
        const CommunityDetails = {...communityDetails,isJoined:isJoined};
        
        return res.status(200).json(new response(200,"Community Details : ",CommunityDetails));
        
    } catch (e) {
        throw new error(500,"Internal server error");
    }
});

export default community_details;

