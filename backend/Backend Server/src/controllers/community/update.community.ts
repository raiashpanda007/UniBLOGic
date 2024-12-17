import {asyncHandler, response, error,deleteSingleFile, uploadCloudinary } from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import {z as zod } from 'zod';


const prisma =  new PrismaClient();

const schema = zod.object({
    name: zod.string().min(3).max(255),
    description: zod.string().min(3),
})
const headersSchema = zod.object({
    communityid:zod.string()
});
const updateCommunityDetails = asyncHandler(async (req,res) =>{
    console.log("Update Community Details", req.body,req.headers);
    const parsedData = schema.safeParse(req.body);
    if(!parsedData.success){
        throw new error(400,"Invalid Data provided",parsedData.error.errors);
    }
    const {name,description} = parsedData.data;
    const parsedHeaders = headersSchema.safeParse(req.headers);
    if(!parsedHeaders.success){
        throw new error(400,"No community id sent",parsedHeaders.error.errors);

    }

    const communityId = parsedHeaders.data.communityid;
    if(!req.user || !req.user.id) throw new error(401,"Unauthorized");
    const userId = req.user?.id;

    // First checking that the community id and the user id are valid
    const community =  await prisma.community.findUnique({
        where:{
            id:communityId
        }
    })
    if(!community) throw new error(404,"Community not found");
    if(community.adminId !== userId) {
        throw new error(401,"You are not authorized to update this community");
    }

    const oldcommunityLogo = community.communityLogo;
    const newcommunityLogo = (req.files as { [fieldname: string]: Express.Multer.File[] })?.['communityLogo']?.[0]?.path;
    if(oldcommunityLogo && newcommunityLogo){
        const deleteFile = await deleteSingleFile(oldcommunityLogo);
        console.log("Deleted File:",deleteFile);
    }
    const communityLogoUrl = await uploadCloudinary(newcommunityLogo);
    try {
        const updatedCommunity = await prisma.community.update({
            where:{
                id:communityId
            },
            data:{
                name,
                description,
                communityLogo:communityLogoUrl?.secure_url || oldcommunityLogo
            }
        });
        if(!updatedCommunity) throw new error(500,"Community not updated");
        return res.status(200).json(new response(200,"Community updated successfully",updatedCommunity));
    } catch (e) {
        throw new error(500,"Community not updated");
    }

})
export default updateCommunityDetails;