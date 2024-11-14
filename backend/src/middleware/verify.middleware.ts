import { asyncHandler, error } from "../utilities/utilities";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
const verify = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.refreshToken;
    if(!token) {
        throw new error(401,"No token provided");

    }
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if(secret){
        try {
            const decoded = jwt.verify(token, secret);
            if(!decoded){
                throw new error(401, "Invalid token");
            } else {
                next();
            }
        } catch (e) {
            throw new error(401, "Invalid token");
        }
    }else {
        throw new error(500, "Internal server error");
    }


})
export default verify;