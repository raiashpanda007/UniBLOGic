import { Request, Response } from "express";
import { asyncHandler, response } from "../../../utilities/utilities";
import generateOTP from "./generateOTP";
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';

const requestOTP = asyncHandler(async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const userRequestDetails = req.user;

    if(!userRequestDetails) {
        return res.status(401).json(new response(401, "Unauthorized", false));
    }
    const email = userRequestDetails.email;
    if (!email) {
        return res.status(400).json(new response(401, "Email is required", false));
    }

    // Check if the email exists in the User table
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(404).json(new response(404, "User not found", false));
    }

    const otp = generateOTP();  // Generates a numeric OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Set OTP expiry time to 10 minutes from now

    // Store OTP in the database with email reference
    await prisma.otp.create({
        data: {
            email,
            otpCode: otp,
            expiresAt
        }
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    const text = `
        Subject: UniBLOGic OTP Verification
        
        Dear Student,
        
        Welcome to UniBLOGic! To complete your registration as a student of the Indian Institute of Information Technology, please use the following One-Time Password (OTP) for verification:
        
        OTP: ${otp}
        
        This code is valid for the next 10 minutes. Please enter it promptly to verify your account and start exploring UniBLOGic.
        
        If you did not request this, please ignore this message or contact our support team.
        
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
