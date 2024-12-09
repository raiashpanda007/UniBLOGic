import { asyncHandler, error } from "../utilities/utilities";
import { Request, Response, NextFunction } from "express";
import jwt,{JwtPayload} from "jsonwebtoken"

interface DecodedToken extends JwtPayload {
    id:string;
    email:string;
    role:string;

}
const verify = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.refreshToken;
    
    if(!token) {
        throw new error(401,"No token provided");

    }
    const secret = process.env.REFRESH_TOKEN_SECRET;
    
    if(secret){
        
        try {
            const decoded =  jwt.verify(token, secret) as DecodedToken;

            
            if(!decoded){
                console.log("decoded is null");
                throw new error(401, "Invalid token");
            } else {
                
                req.user = decoded;
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