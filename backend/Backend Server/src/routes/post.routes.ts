import { Router } from "express";
import {createPost,fetchAllPosts,upvotePost} from '../controllers/post/post.controller';
import verify from '../middleware/verify.middleware';
import {upload} from "../middleware/multer.middleware";
const router = Router();

router.route("/create_post").post(
    verify,
    upload.fields([
        {name: 'postimages', maxCount: 5},
        {name: 'video', maxCount: 1}
    ]),
    createPost
)
router.route("/fetch_all_posts").get(
    verify,
    fetchAllPosts
)
router.route("/upvote_post").post(
    verify,
    upvotePost
    // upvotePost
)

// TODO:
// 1.Add an upvote route
// 2.add a comment route
// 3.ad remove upvote route
// 4.Check whether the user has already upvoted
export default router;