import { Router } from "express";
import {createPost} from '../controllers/post/post.controller';
import verify from '../middleware/verify.middleware';
const router = Router();

router.route("/create_post").post(
    verify,
    createPost
)
export default router;