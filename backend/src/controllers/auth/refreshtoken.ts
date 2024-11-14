import {asyncHandler,error} from "../../utilities/utilities"
import jwt from "jsonwebtoken"
const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if(!refreshToken){
        throw new error(401, "No refresh token provided");
    }
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if(secret){
        try {
            //decode refreshToken
            const decoded = jwt.verify(refreshToken, secret);
            if(!decoded){
                throw new error(401, "Invalid token");
            } else {
                
            }

            
        } catch (error) {
            
        }
    }
    
})