import { asyncHandler, error, response, uploadCloudinary } from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import videoList from './videoList';
import { z as zod } from 'zod';
const prisma = new PrismaClient();
const postSchema = zod.object({
    title: zod.string().min(1, "Title must be at least 1 character long"),
    description: zod.string().min(1, "Description must be at least 1 character long"),
    communityid: zod.string() ,
    videoname: zod.string().optional()

})
const createPost = asyncHandler(async (req, res) => {
    console.log(req.body);
    
    const parsedData = postSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json(new response(400, "Invalid data", parsedData.error))
    }
    const { title, description, communityid,videoname } = parsedData.data
    const community = await prisma.community.findUnique({
        where: {
            id: communityid,
            adminId: req.user?.id
        }
    });
    if (!community) {
        throw new error(400, "Community not found or you are not a authroized person to create post in this community")
    }
    const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
    };

    const postImages = files['postimages'] || [];
    const video =  await videoList(videoname||'');


    let postImagesUrls: string[] = [];
    

    try {
        // Upload images to Cloudinary
        for (let i = 0; i < postImages.length; i++) {
            const result = await uploadCloudinary(postImages[i].path);
            if (!result || !result.secure_url) {
                return res.status(500).json(new response(500, "Failed to upload image", result));
            }
            postImagesUrls.push(result.secure_url);
        }

        // Upload video to Cloudinary
        
        // Use Prisma transaction to create the post and associated data
        const transaction = await prisma.$transaction(async (tx) => {
            const post = await tx.post.create({
                data: {
                    title,
                    content: description,
                    authorId: communityid,
                },
            });


            const postPhotos = postImagesUrls ? await tx.postPhotos.createMany({
                data: postImagesUrls.map((url) => ({
                    photo: url,
                    postId: post.id,
                })),
            }) : null;



            const postvideo = video ? await tx.postVideos.createMany({
                data:[
                    {
                        postId:post.id,
                        quality:'SD',
                        videoUrl:video['SD']
                    },
                    {
                        postId:post.id,
                        quality:'HD',
                        videoUrl:video['HD']
                    },
                    {
                        postId:post.id,
                        quality:'FHD',
                        videoUrl:video['FHD']
                    },
                    
                ],
            }) : null;

            return { post, postPhotos, postvideo };

        });
        

        return res.status(201).json(new response(201, "Post created successfully", transaction));

    } catch (err) {
        console.error("Error creating post:", err);
        return res.status(500).json(new response(500, "Failed to create post", {}));
    }
});

export default createPost;