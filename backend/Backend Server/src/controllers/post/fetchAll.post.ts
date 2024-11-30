import {asyncHandler,error,response} from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const fetchAllPosts = asyncHandler(async(req,res) =>{
    const posts = await prisma.post.findMany();
    if(posts)
    return res.status(200).json(new response(200,"All posts",posts));
    else
    return res.status(400).json(new error(400,"No posts found"))

});
export default fetchAllPosts