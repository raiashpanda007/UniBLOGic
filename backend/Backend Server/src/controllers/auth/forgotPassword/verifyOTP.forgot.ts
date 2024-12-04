import {asyncHandler,response,error} from '../../../utilities/utilities';
import { Request,Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const verifyOTP_forgot = asyncHandler(async (req,res) =>{
    const {otp,password,email} = req.body;
    

    if(!otp || !email){
        return res.status(400).json(new response(400,"OTP and email are required",false));
    }
    if(!isNaN(otp)){
        return res.status(400).json(new error(400,"Invalid OTP format"));
    }

    try {
        const savedOTP = await prisma.otp.findFirst({
            where:{
                email:email,
                isUsed:false
            }

        })

        if(!savedOTP){
            return res.status(404).json(new error(404,"OTP not found or already used"));
        }

        if(savedOTP.expiresAt< new Date()){
            await prisma.otp.delete({
                where:{
                    id:savedOTP.id
                }
            })
            return res.status(401).json(new error(401,"OTP expired"));
        }
        if(savedOTP === otp) {
            await prisma.$transaction([
                prisma.otp.update({
                    where:{id:savedOTP.id},
                    data:{isUsed:true}
                }),
                prisma.user.update({
                    where:{email:email},
                    data:{password:await bcrypt.hash(password,10)}
                })
            ])
        }
        

    } catch (e) {
        return res.status(404).json(new error(404,"OTP not found or already used"));
    }


})

export default verifyOTP_forgot;