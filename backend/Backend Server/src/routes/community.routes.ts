import { Router } from "express";
import verify from "../middleware/verify.middleware";
import createCommunity from "../controllers/community/create.community";
const router = Router();

router.route("/create").post(
    verify,
    createCommunity
)

export default router;