import { Router } from "express";
import {createPost,fetchAllPosts,upvotePost,comment,getcomments} from '../controllers/post/post.controller';
import verify from '../middleware/verify.middleware';
import {upload} from "../middleware/multer.middleware";
const router = Router();

router.route("/create").post(
    verify,
    upload.fields([
        {name: 'postimages', maxCount: 5},
        {name: 'video', maxCount: 1}
    ]),
    createPost
)
router.route("/allposts").get(
    verify,
    fetchAllPosts
)
router.route("/upvote").post(
    verify,
    upvotePost
    // upvotePost
)
router.route("/comment").post(
    verify,
    comment
)
router.route("/comments").get(
    verify,
    getcomments
)

// TODO:
// 1.Add an upvote route
// 2.add a comment route
// 3.ad remove upvote route
// 4.Check whether the user has already upvoted
export default router;