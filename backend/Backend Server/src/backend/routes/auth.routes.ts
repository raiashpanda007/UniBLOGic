import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {upload} from "../middleware/multer.middleware";
import verifyOTP from "../controllers/auth/otp/verifyOTP";
import {register,userLogin,logout,requestOTP_Forgot,verifyOTP_forgot} from "../controllers/auth/auth.controller";
import requestOTP from "../controllers/auth/otp/requestOTP";
import verify from "../middleware/verify.middleware";
const router = Router();

router.route("/register",).post(
    upload.fields([
        {name: "profilePicture", maxCount: 1},
        {name: "coverImage", maxCount:1}
    ]),
    register
)
router.route("/login").post(
    userLogin
)
router.route("/requestotp",).get(
    verify,
    requestOTP
)
router.route("/verifyotp").post(
    verify,
    verifyOTP
)
router.route("/logout").get(
    verify,
    logout
)
router.route("/forgotPassword/requestOTP").post(
    requestOTP_Forgot
)
router.route("/forgotPassword/verifyOTP").post(
    verifyOTP_forgot
)
//TODO: 1. Logout
// 2. Forgot Password
// 3. Change Password


export default router;