import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {upload} from "../middleware/multer.middleware";
import verifyOTP from "../controllers/auth/otp/verifyOTP";
import {register,userLogin} from "../controllers/auth/auth.controller";
import requestOTP from "../controllers/auth/otp/requestOTP";
const router = Router();

router.route("/register",).post(
    register
)
router.route("/login").post(
    userLogin
)
router.route("/requestotp",).get(
    requestOTP
)
router.route("/verifyotp").get(
    verifyOTP
)
export default router;