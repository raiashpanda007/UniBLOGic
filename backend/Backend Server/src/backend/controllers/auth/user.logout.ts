import {asyncHandler,response} from '../../utilities/utilities';
import {Request, Response} from 'express';

const logout = asyncHandler(async (req,res)=>{
    res.clearCookie("refreshToken");
    res.status(200).json(new response(200,"Logout Successful",{}));
})

export default logout;