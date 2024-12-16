import { Router } from "express";
import {showAllUsers,user_details,updateUserDetails} from "../controllers/users/user.controller";
import {upload} from "../middleware/multer.middleware";
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
router.route("/update").put(
    verify,
    upload.fields([
        {name: "profilePicture", maxCount: 1},
        
    ]),
    updateUserDetails
)
// TODO: 
// 2. Update Profile photo and user
// 3. 
// 4.Upload profile photo and background photo


export default router;