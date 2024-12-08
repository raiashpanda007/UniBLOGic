import { Request, Response } from "express";
import { asyncHandler, response } from "../../../utilities/utilities";
import generateOTP from "../otp/generateOTP";
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';

const requestOTP = asyncHandler(async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    

    
    const {email,username} = req.body;
    if (!email || !username) {
        return res.status(400).json(new response(401, "Email and username  is required", false));
    }

    // Check if the email exists in the User table
    const user = await prisma.user.findUnique({ where: { email,username } });
    if (!user) {
        return res.status(404).json(new response(404, "User not found", false));
    }

    const otp = generateOTP();  
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 
    await prisma.otp.create({
        data: {
            email,
            otpCode: otp,
            expiresAt
        }
    });
    const getUser = await prisma.user.findUnique({ where: { email } });

    if(!getUser) {
        return res.status(404).json(new response(404, "User not found", false));
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    const text = `
        Subject: UniBLOGic OTP Verification
        
        Dear ${getUser.name}, 
        Your request for OTP to forgot password has been received.
        OTP: ${otp}
        Best regards,  
        The UniBLOGic Team
    `;
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP for email verification',
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully");
        res.status(200).json(new response(200, "OTP sent successfully", true));
    } catch (error) {
        console.log("Internal server error || Invalid Email", error);
        res.status(500).json(new response(500, "Internal server error || Invalid Email", false));
    }
});

export default requestOTP;
