import { Router } from "express";
import verify from "../middleware/verify.middleware";
import createCommunity from "../controllers/community/create.community";
import {upload} from '../middleware/multer.middleware'
const router = Router();

router.route("/create").post(
    verify,
    upload.fields([
        {name: "communityLogo", maxCount: 1}
    ]),
    createCommunity
)

export default router;