import { asyncHandler, response, error, uploadCloudinary, deleteSingleFile } from "../../utilities/utilities";
import { z as zod } from "zod";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateUserDetailsSchema = zod.object({
    name: zod.string().min(3).max(255),
    username: zod.string().min(3).max(255),

})
const updateUserDetails = asyncHandler(async (req, res) => {
    const parsedData = updateUserDetailsSchema.safeParse(req.body);
    console.log("Updated input", req.body);
    if (!parsedData.success) {
        return res.status(400).json(new error(400, "Type Validation Error", parsedData.error.errors));
    }
    const { name, username } = parsedData.data;
    const userId = req.user?.id;

    // find the user that is updating the data is the same user
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }, select: {
            username: true,
            name: true,
            profilePicture: true
        }
    });
    if (!user) {
        return res.status(404).json(new error(404, "User not found"));
    }
    if (user.username !== username) {
        throw new error(401, "You are not authorized to update this user");
    }

    const profilePicture = (req.files as { [fieldname: string]: Express.Multer.File[] })?.['profilePicture']?.[0];
    if (user.profilePicture && profilePicture) {

        const deleteFile = await deleteSingleFile(user.profilePicture);
        console.log("Deleted File:", deleteFile);
    }

    const profilePictureUrl =  await uploadCloudinary(profilePicture.path) ;
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    name,
                    username,
                    profilePicture: profilePictureUrl?.secure_url || user.profilePicture
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