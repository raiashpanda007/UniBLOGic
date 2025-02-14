import {asyncHandler , response , error} from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const allCommunities = asyncHandler(async (req, res) => {
    
    const communities = await prisma.community.findMany({
        where:{
            OR:[
                {
                    users:{
                        some:{
                            id:req.user?.id
                        }
                    }
                },{
                    adminId:req.user?.id
                }
            ]

        },
        select: {
            id: true,
            name: true,
            description: true,
            communityLogo: true
        }
    })
    return res.status(200).json(new response(200, "All communities", communities));

});
export default allCommunities;