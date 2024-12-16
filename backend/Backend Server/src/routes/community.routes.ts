import { Router } from "express";
import verify from "../middleware/verify.middleware";
import {createCommunity,community_details,updateCommunityDetails} from "../controllers/community/communnity.controller";
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

router.route("/update").put(
    verify,
    upload.fields([
        {name: "communityLogo", maxCount: 1}
    ]),
    updateCommunityDetails
)

export default router;