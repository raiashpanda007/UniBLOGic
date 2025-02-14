import { asyncHandler, response } from "../../../utilities/utilities";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
    const { otp } = req.body;
    console.log("OTP send by frontend",otp);
    const email = req.user?.email;
    const userInfo = await prisma.user.findUnique({ where: { email: email } ,select:{
        branch:true,
        batch:true
    }});

    const batch = userInfo?.batch;

    const branch = userInfo?.branch;

    // Validate OTP and email presence
    if (!otp || !email) {
        return res.status(400).json(new response(400, "OTP and email are required", false));
    }

    // Parse and validate OTP format
    const otpCode = parseInt(otp, 10);
    if (isNaN(otpCode)) {
        return res.status(400).json(new response(400, "Invalid OTP format", false));
    }

    // Parse batch if provided
    

    try {
        // Check for existing OTP
        const savedOtp = await prisma.otp.findFirst({
            where: { email, isUsed: false },
        });

        if (!savedOtp) {
            return res.status(404).json(new response(404, "OTP not found or already used", false));
        }

        // Validate OTP code
        if (savedOtp.otpCode !== otpCode) {
            console.log("saved otp:", savedOtp.otpCode, "sent otp:", otpCode);
            return res.status(401).json(new response(401, "Invalid OTP", false));
        }

        // Check for OTP expiration
        if (savedOtp.expiresAt < new Date()) {
            await prisma.otp.delete({ where: { id: savedOtp.id } });
            return res.status(401).json(new response(401, "OTP expired", false));
        }

        // Update OTP and User within a transaction
        await prisma.$transaction([
            prisma.otp.update({
                where: { id: savedOtp.id },
                data: { isUsed: true },
            }),
            prisma.user.update({
                where: { email },
                data: {
                    role: "USER",
                    ...(branch && { branch }),
                    ...(batch && { batch }),
                },
            }),
        ]);

        // Success response
        return res.status(200).json(new response(200, "OTP verified successfully", true));
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json(new response(500, "Internal server error", false));
    }
});

export default verifyOTP;
