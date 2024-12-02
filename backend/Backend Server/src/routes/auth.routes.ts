import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {upload} from "../middleware/multer.middleware";
import verifyOTP from "../controllers/auth/otp/verifyOTP";
import {register,userLogin,logout} from "../controllers/auth/auth.controller";
import requestOTP from "../controllers/auth/otp/requestOTP";
import verify from "../middleware/verify.middleware";
const router = Router();

router.route("/register",).post(
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
//TODO: 1. Logout
// 2. Forgot Password
// 3. Change Password


export default router;