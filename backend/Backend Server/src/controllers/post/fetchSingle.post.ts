import { asyncHandler, response, error } from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import { z as zod } from 'zod';
import isJoined from '../community/isJoined.community';
const prisma = new PrismaClient();
const fetchSinglePostSchema = zod.object({
    postid: zod.string()
})
interface Comment {
    postId: string;
    content: string;
    createdAt: Date;
    user: {
        name: string;
        profilePicture: string;
        username: string;
    }
}
interface PostData {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    authorId: string;
    postImages?: string[];
    postVideo?: string[];
    upvotes: number;
    comments: Comment[];
    commentsCount: number;
    communityName: string;
    communityDescription: string;
    isJoined: boolean;
    isUpvoted: boolean;
    communityLogo?: string;
    communityid: string;
}
const fetchSingle = asyncHandler(async (req, res) => {
    const parsedData = fetchSinglePostSchema.safeParse(req.headers);
    if (!parsedData.success) {
        return res.status(400).json(new error(400, "Invalid input data"));
    }
    const { postid } = parsedData.data;
    const post = await prisma.post.findUnique({
        where: {
            id: postid
        }, select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            authorId: true,
            postPhoto: {
                select: {
                    photo: true
                }
            },
            postVideo: true,
            upvotes: true,

        }
    });
    const upvoteCounts = await prisma.upvotes.findMany({
        where: {
            postId: postid
        },
    })
    const isUpvoted = async (postid: string) => {
        const answer = await prisma.upvotes.findFirst({
            where: {
                userId: req.user?.id,
                postId: postid
            }
        });
        if (answer) return true;


        return false;

    }
    const comments = await prisma.comments.findMany({
        where: {
            postId:postid
        }, select: { postId: true, content: true, createdAt: true, user:{
            select:{
                name:true,
                profilePicture:true,
                username:true
            }
        } }
    })
    if (post) {
        const commuity = await prisma.community.findUnique({
            where: {
                id: post.authorId
            }
        });
        if (!commuity) return res.status(404).json(new error(404, "Community not found"));
        const postImages = await prisma.postPhotos.findMany({
            where: {
                postId:postid
            }, select: { photo: true }
        });
        const postVideos = await prisma.postVideos.findMany({
            where: {
                postId:postid
            }, select: { videoUrl: true }
        });
        const postData: PostData = {
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            authorId: post.authorId,
            postImages: postImages.map(image => image.photo),
            postVideo: postVideos.map(video=>video.videoUrl),
            upvotes: upvoteCounts.length || 0,
            comments: comments.map(comment => ({
                ...comment,
                user: {
                    ...comment.user,
                    profilePicture: comment.user.profilePicture || ''
                }
            })),
            commentsCount: comments.length,
            communityName: commuity?.name,
            communityDescription: commuity?.description,
            isJoined: await isJoined(commuity?.id || "", req.user?.id || ""),
            isUpvoted: await isUpvoted(post.id),
            communityid: commuity?.id,
            communityLogo: commuity?.communityLogo || ""   
        }
        return res.status(200).json(new response(200, "Post found", postData));
    }
    
    if (!post) {
        return res.status(404).json(new error(404, "Post not found"));
    }
    
})
export default fetchSingle;