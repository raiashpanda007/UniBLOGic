import {asyncHandler,response,error} from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
import {z as zod } from "zod";

const prisma = new PrismaClient();
const user_details_schema = zod.object({
    userid : zod.string()
})
const user_details = asyncHandler(async (req,res) => {
    
    const parsedSchema = user_details_schema.safeParse(req.headers)
    
    if(!parsedSchema.success) {
        throw new error(400,"UserId not found");
    }
    const providedUserID = parsedSchema.data.userid;
    try {
        const userDetails =  await prisma.user.findFirst({
            where:{
                id:providedUserID
            },
            select:{
                id:true,
                username:true,
                name:true,
                profilePicture:true,
                communities:{
                    select:{
                        id:true,
                        name:true,
                        description:true,
                        communityLogo:true,
                    }
                },
                email:true,
                batch:true,
                branch:true,
            }
        });
        return res.status(200).json(new response(200," User Details : ",userDetails))
        
    } catch (e) {
        throw new error(500,"Internal server error");
        
    }
})

export default user_details