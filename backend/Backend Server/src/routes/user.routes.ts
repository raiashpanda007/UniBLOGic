import { Router } from "express";
import {showAllUsers,user_details} from "../controllers/users/user.controller";
import verify from "../middleware/verify.middleware";
const router = Router();

router.route("/all_users").get(
    verify,
    showAllUsers

)

router.route("/details").get(
    verify,
    user_details
)

// TODO: 
// 2. Update Profile photo and user
// 3. 
// 4.Upload profile photo and background photo


export default router;