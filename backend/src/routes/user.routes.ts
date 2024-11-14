import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {upload} from "../middleware/multer.middleware";
import {register} from "../controllers/users/user.controller";
import requestOTP from "../controllers/otp/requestOTP";
const router = Router();

router.route("/register",).post(
    register
)
router.route("/requestotp",).get(
    requestOTP
)
router.route("/verifyotp").get(
    
)
export default router;