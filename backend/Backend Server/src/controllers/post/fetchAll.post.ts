import { asyncHandler, error, response } from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import  isJoined from '../community/isJoined.community';
interface PostData {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    authorId: string;
    postImages?: string[];
    postVideo: string[];
    upvotes: number;
    comments: number;
    communityName: string;
    communityDescription: string;
    isJoined: boolean;
    isUpvoted: boolean;
    communityLogo?:string;
    communityid:string;
}

const prisma = new PrismaClient();

const fetchAllPosts = asyncHandler(async (req, res) => {
    const posts = await prisma.post.findMany(
        {
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                authorId: true,
            }
        }
    );
    const upvoteCounts = await prisma.upvotes.findMany({
       where:{
              postId:{
                in:posts.map(post=>post.id)
              }
       },select:{postId:true}
    })
    const isUpvoted = async (postId: string) =>{
        const answer = await prisma.upvotes.findMany({
            where:{
                userId:req.user?.id,
                postId:postId
            }
        });
        if(answer.length > 0) return true;


        return false;

    }
    const commentsCounts = await prisma.comments.findMany({
        where:{
            postId:{
                in:posts.map(post=>post.id)
            }
        },select:{postId:true}
    })
    
    
    


    if (posts.length > 0) {
        const Community = await prisma.community.findMany({
            where:{
                id:{
                    in:posts.map(post=>post.authorId)
                }
            },select:{
                id:true,
                name:true,
                description:true,
                communityLogo:true
            }
        });
        const postImages = await prisma.postPhotos.findMany({
            where:{
                postId:{
                    in:posts.map(post=>post.id)
                }
            }
        });
        const postVideos = await prisma.postVideos.findMany({
            where:{
                postId:{
                    in:posts.map(post=>post.id)
                },
            },select:{videoUrl:true,postId:true}
        });
        const postData: PostData[] = await Promise.all(posts.map(async (post) => {
            const images = postImages.filter(image => image.postId === post.id).map(image => image.photo);
            const video = postVideos.filter(video => video.postId === post.id).map(video => video.videoUrl);
            return {
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            authorId: post.authorId,
            postImages: images,
            postVideo: video,
            upvotes: upvoteCounts.filter(upvote=>upvote.postId===post.id).length,
            comments: commentsCounts.filter(comment=>comment.postId===post.id).length,
            communityName: Community.find(community => community.id === post.authorId)?.name || "",
            communityDescription: Community.find(community => community.id === post.authorId)?.description || "",
            isJoined: await isJoined(Community.find(community => community.id === post.authorId)?.id || "", req.user?.id || ""),
            isUpvoted: await isUpvoted(post.id),
            communityLogo:Community.find(community => community.id === post.authorId)?.communityLogo || "",
            communityid:Community.find(community => community.id === post.authorId)?.id || ""
            
            }
        }));
        return res.status(200).json(new response(200,"This post is the id" ,postData));

    }
        
    else
        return res.status(400).json(new error(400, "No posts found"))

});
export default fetchAllPosts