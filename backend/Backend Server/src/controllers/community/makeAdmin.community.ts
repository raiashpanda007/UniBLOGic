import {asyncHandler,response,error} from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
import { z as zod } from 'zod';
const prisma = new PrismaClient();
const makeAdminSchema = zod.object({
    communityid: zod.string(),
    userid: zod.string(),
})
const makeAdmin = asyncHandler(async (req,res)=>{
    
    const parsedData = makeAdminSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json(new response(400,"Invalid data",parsedData.error));
    }
    const {communityid,userid} = parsedData.data;
    const community = await prisma.community.findUnique({
        where:{
            id:communityid
        }
    });
    if(!community){
        return res.status(404).json(new response(404,"Community not found",null));
    }
    // is he the valid person
    const isUserVerified = (community.adminId === req.user?.id);
    if(!isUserVerified){
        return res.status(403).json(new response(403,"You are not authorized to make user admin",null));
    }
    try{
        await prisma.$transaction([
              prisma.community.update({
                where:{
                    id:communityid
                },
                data:{
                    adminId:userid
                }
            }), prisma.user.update({
                where:{
                    id:userid
                },
                data:{
                    role:"ADMIN"
                }
            })
        ])
    }catch(error){
        return res.status(500).json(new response(500,"Error making user admin",{}));
    }

})
export default makeAdmin;