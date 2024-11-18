import { Router } from "express";
import {createPost,fetchAllPosts} from '../controllers/post/post.controller';
import verify from '../middleware/verify.middleware';
const router = Router();

router.route("/create_post").post(
    verify,
    createPost
)
router.route("/fetch_all_posts").get(
    fetchAllPosts
)

// TODO:
// 1.Add an upvote route
// 2.add a comment route
// 3.add remove upvote route
export default router;