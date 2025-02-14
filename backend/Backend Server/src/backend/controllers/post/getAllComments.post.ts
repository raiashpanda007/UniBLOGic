import {asyncHandler , response ,error} from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import { z as zod } from 'zod';
const prisma = new PrismaClient();
const getAllComments = asyncHandler(async (req,res) =>{
    const {postId} = req.body;
    if(!postId){
        return res.status(400).json(new error(400,"Post ID is missing"));
    }


    const comments = await prisma.comments.findMany({
        where:{
            postId
        }
    });
    return res.status(200).json(new response(200,"Comments fetched successfully",comments));
})

export default getAllComments;