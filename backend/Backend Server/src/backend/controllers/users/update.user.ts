import { asyncHandler, response, error, uploadCloudinary, deleteSingleFile } from "../../utilities/utilities";
import { z as zod } from "zod";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateUserDetailsSchema = zod.object({
    name: zod.string().min(3).max(255),
    username: zod.string().min(3).max(255),
    

})
const headersUserSchema = zod.object({
    userid: zod.string().min(3)
})
const updateUserDetails = asyncHandler(async (req, res) => {
   
    const parsedData = updateUserDetailsSchema.safeParse(req.body);
    const headerParsed = headersUserSchema.safeParse(req.headers)
    if (!parsedData.success || !headerParsed.success) {
        console.log("Type Validation errors : " ,  parsedData?.error?.errors || headerParsed?.error?.errors)
        return res.status(400).json(new error(400, "Type Validation Error",parsedData?.error?.errors || headerParsed?.error?.errors));
    }
    const { name, username } = parsedData.data;
    const {userid} = headerParsed.data;
    const userId = req.user?.id;



    if(userid != userId) {

        return res.status(401).json(new response(401,"You are unauthorized to change this user details " , {}));
        
    } 
    // find the user that is updating the data is the same user
   
    const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            name:true,
            username:true,
            profilePicture:true
        }
    })
    if(!user) return res.status(500).json(new response(500,"Can't find user",{}) );

    const profilePicture = (req.files as { [fieldname: string]: Express.Multer.File[] })?.['profilePicture']?.[0].path;
    if (user?.profilePicture && profilePicture) {

        const deleteFile = await deleteSingleFile(user.profilePicture);
        console.log("Deleted File:", deleteFile);
    }

    const profilePictureUrl =  await uploadCloudinary(profilePicture) ;
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    name,
                    username,
                    profilePicture: profilePictureUrl?.secure_url || user.profilePicture
                },select:{
                    id:true,
                    name:true,
                    username:true,
                    profilePicture:true,
                    batch:true,
                    branch:true,
                }
            });
            if (!updatedUser) {
                return res.status(500).json(new error(500, "User not updated"));
            }
            return res.status(200).json(new response(200, "User updated successfully", updatedUser));
        }
        catch (e) {
            throw new error(500, "User not updated");
        }

})

export default updateUserDetails;