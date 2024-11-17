interface LoginInput {
    
    username: string;
    password: string;
}
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import {generateRefreshToken} from './tokenGenerate'

const loginUser = async ({username, password}: LoginInput) => {
        //check user exist or not
        const user = await prisma.user.findFirst({
            where: {
                username
            }
        });
        if(!user) {
            return {
                success:false,
                message:"User doesn't exist"
            }
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return {
                success:false,
                message:"Invalid password"
            }
        }
        const refreshToken = await generateRefreshToken({id:user.id});
        

        return {
            success:true,
            message:"Login successful",
            refreshToken,
        }



}
export default loginUser;