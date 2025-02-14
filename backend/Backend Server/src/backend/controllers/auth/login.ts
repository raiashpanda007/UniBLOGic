interface LoginInput {
    
    username: string;
    password: string;
}
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import {generateRefreshToken} from './tokenGenerate'
import {response} from "../../utilities/utilities"
const loginUser = async ({username, password}: LoginInput) => {
        //check user exist or not
        const user = await prisma.user.findFirst({
            where: {
                username
            },select:{
                password:true,
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
        const loggedInUser = await prisma.user.findFirst({
            where:{
                username
            },
            select:{
                id:true,
                username:true,
                email:true,
                role:true,
                batch:true,
                branch:true,
                profilePicture:true
            }

        })
        if(!loggedInUser) {
            return {
                success:false,
                message:"User doesn't exist"
            }
        }
        const refreshToken = await generateRefreshToken({id:loggedInUser.id,email:loggedInUser.email,role:loggedInUser.role,username:loggedInUser.username});
        

        return {
            success:true,
            message:"Login successful",
            refreshToken,
            loggedInUser
        }



}
export default loginUser;