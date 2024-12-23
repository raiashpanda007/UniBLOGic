import  {asyncHandler,error,response} from "../../utilities/utilities"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();


const showAllUsers = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
        where:{
            OR:[{role:"USER"},{role:"ADMIN"}]
        },
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            branch:true,
            batch:true,
            profilePicture:true
        }
        
    });
    return res.status(200).json(new response(200, "All users", users));
})
export default showAllUsers
