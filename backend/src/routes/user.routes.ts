import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {upload} from "../middleware/multer.middleware";
import {register} from "../controllers/users/user.controller";
const router = Router();

router.route("/register",).post(
    register
)
export default router;