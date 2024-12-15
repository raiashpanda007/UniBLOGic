import { Router } from "express";
import verify from "../middleware/verify.middleware";
import {createCommunity,community_details} from "../controllers/community/communnity.controller";
import {upload} from '../middleware/multer.middleware'
const router = Router();

router.route("/create").post(
    verify,
    upload.fields([
        {name: "communityLogo", maxCount: 1}
    ]),
    createCommunity
)
router.route("/details").get(
    verify,
    community_details
)

export default router;