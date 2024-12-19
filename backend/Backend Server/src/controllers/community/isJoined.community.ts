import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const isJoinedCommunity = async(communityid:string,userId:string) =>{
    const community = await prisma.community.findUnique({
        where:{
            id:communityid,
            OR:[{
                users:{
                    some:{
                        id:userId
                    }
                }
            }]
        }
    })
    if(community) 
        return true;
    else
        return false;
}
export default isJoinedCommunity;