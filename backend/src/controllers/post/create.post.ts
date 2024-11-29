import {asyncHandler,error,response} from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import {z as zod} from 'zod';
const prisma = new PrismaClient();
const postSchema = zod.object({
    title: zod.string().min(1,"Title must be at least 1 character long"),
    description: zod.string().min(1,"Description must be at least 1 character long"),
    multimedia: zod.string().optional()
})
const  createPost = asyncHandler(async(req,res) =>{
    const parsedData = postSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json(new error(400,parsedData.error.message));
    }
    const communityID = req.headers.communityid as string;
    if(!communityID) {
        return res.status(400).json(new error(400,"Community ID is required"));
    }
    const {title,description,multimedia} = parsedData.data;
    const postCreated = await prisma.post.create({
        data:{
            title,
            content:description,
            multimedia,
            authorId:communityID
        }
    })

    if(!postCreated){
        return res.status(500).json(new error(500,"Post not created"));
    }
    return res.status(201).json(new response(201,"Post created successfully",postCreated));

})

export default createPost