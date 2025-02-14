import { asyncHandler, response, error } from '../../utilities/utilities';
import { Request, Response } from 'express';
import { z as zod } from 'zod';
import loginUser from './login';

const userLogin = asyncHandler(async (req: Request, res: Response) => {
    
    // Validate request body
    const loginSchema = zod.object({
        username: zod.string().min(3).max(255),
        password: zod.string().min(8).max(255),
    });
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res
            .status(400)
            .json(new error(400, 'Invalid data', parsed.error.errors.map((err) => err.message)));
    }
    const { username, password } = parsed.data;

    // Authenticate user
    const result = await loginUser({ username, password });
    if (!result.success || !result.loggedInUser) {
        return res.status(400).json(new error(400, result.message));
    }

    // Ensure refreshToken is defined
    const refreshToken = result.refreshToken ?? '';
    if (!refreshToken ||  refreshToken === '') {
        return res.status(400).json(new error(400, 'Failed to generate refresh token'));
    }

    // Cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: true, // Use secure cookies only in production
      };

    // Set cookie and send response
    
    return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new response(200, result.message, result.loggedInUser));
});

export default userLogin;
