import {asyncHandler , response ,error} from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import { z as zod } from 'zod';
const prisma = new PrismaClient();
const fetchSinglePostSchema = zod.object({
    postId:zod.string()
})
const fetchSingle = asyncHandler(async(req,res) =>{
    const parsedData = fetchSinglePostSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json(new error(400,"Invalid input data"));
    }
    const {postId} = parsedData.data;
    const post = await prisma.post.findUnique({
        where:{
            id:postId
        }
    });
    if(!post){
        return res.status(404).json(new error(404,"Post not found"));
    }
    return res.status(200).json(new response(200,"Post fetched successfully",post));
})
export default fetchSingle;