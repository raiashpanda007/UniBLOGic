import { asyncHandler, error, response } from '../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import { z as zod } from 'zod';
interface UpvotePostRequest {
    existingUpvote: string;
}
const prisma = new PrismaClient();
const unUpvote = async ({existingUpvote}:UpvotePostRequest ) =>{
    const downvote = await prisma.upvotes.delete({
        where:{
            id:existingUpvote
        }
    })
    return downvote;
}

const upvotePost = asyncHandler(async (req, res) => {
  // Define validation schema
  const upvotePostSchema = zod.object({
    postID: zod.string().min(1, "Post ID must be at least 1 character long"),
    userID: zod.string().min(1, "User ID must be at least 1 character long"),
  });

  // Extract input
  const postID = req.headers.postid as string; 
  const userID = req.user?.id; 

  // Ensure `userID` is a string
  if (!userID) {
    return res
      .status(401)
      .json(new error(401, "User is not authenticated or user ID is missing"));
  }

  // Validate input
  const safeParsed = upvotePostSchema.safeParse({ postID, userID });
  if (!safeParsed.success) {
    return res.status(400).json(
      new error(400, "Invalid input", safeParsed.error.errors)
    );
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userID },
  });
  if (!user) {
    return res.status(404).json(new error(404, "User not found"));
  }

  // Check if post exists
  const post = await prisma.post.findUnique({
    where: { id: postID },
  });
  if (!post) {
    return res.status(404).json(new error(404, "Post not found"));
  }

  // Check for duplicate upvote
  const existingUpvote = await prisma.upvotes.findFirst({
    where: {
      postId: postID,
      userId: userID,
    },
  });
  if (existingUpvote) {
    const donwvote = await unUpvote({existingUpvote:existingUpvote.id});
    return res.status(201).json(new response(201, "Upvote already exists and it is unvoted",donwvote));
  }

  // Create upvote
  const upvote = await prisma.upvotes.create({
    data: {
      postId: postID,
      userId: userID, 
    },
  });

  // Send success response
  res.status(201).json(
    new response(201, "Upvote successfully added", {
      upvote,
    })
  );
});

export default upvotePost;
