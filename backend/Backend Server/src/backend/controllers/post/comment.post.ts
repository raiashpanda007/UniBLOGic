import {asyncHandler, response ,error} from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import { z as zod } from 'zod';
const commentDataSchema = zod.object({
    postid:zod.string(),
    comment:zod.string().min(1).max(1000)
})
const prisma = new PrismaClient();
const commentPost = asyncHandler(async (req,res) =>{
    const parsedData = commentDataSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json(new error(400,"Invalid input data"));
    }
    const {postid,comment} = parsedData.data;
    const userID = req.user?.id;
    if(!userID){
        return res.status(401).json(new error(401,"User is not authenticated or user ID is missing"));
    }

    try {
        const commentData = await prisma.comments.create({
            data:{
                content:comment,
                userId:userID,
                postId:postid
            }
        });
        return res.status(200).json(new response(200,"Comment added successfully",commentData));
    } catch (error) {
        return res.status(500).json(new response(500,"Internal server error",{}));
        
    }

    
})

export default commentPost;