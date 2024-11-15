import { Router } from "express";
import {showAllUsers} from "../controllers/users/user.controller";
import verify from "../middleware/verify.middleware";
const router = Router();

router.route("/all_users").get(
    verify,
    showAllUsers

)

export default router;