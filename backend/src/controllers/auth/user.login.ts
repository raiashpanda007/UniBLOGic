import {asyncHandler , response, error} from '../../utilities/utilities'
import {Request, Response} from 'express'
import {z as zod} from 'zod'
import loginUser from './login'
const userLogin = asyncHandler(async (req: Request, res: Response) => {
    const loginSchema = zod.object({
        username: zod.string().min(3).max(255),
        password: zod.string().min(8).max(255)
    });
    const parsed = loginSchema.safeParse(req.body);
    if(!parsed.success) {
        return res.status(400).json(new error(400, 'Invalid data', parsed.error.errors));
    }
    const {username, password} = parsed.data;
    const result = await loginUser({username, password});
    if(!result.success) {
        return res.status(400).json(new error(400, result.message));
    }
    const options = {
        httpOnly: true,
        secure: false,
    }
    return res.status(200).cookie("refreshToken" ,result.refreshToken,options).json(new response(200, result.message,{}))
});

export default userLogin;