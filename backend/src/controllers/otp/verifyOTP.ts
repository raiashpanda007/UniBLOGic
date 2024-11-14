import { asyncHandler, response } from "../../utilities/utilities"
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const { otp, email } = req.body;
    if (!otp || !email) {
        return res.status(400).json({
            success: false,
            message: "OTP and email are required"
        });
    }
    const savedOtp = await prisma.otp.findFirst({
        where: {
            email,
            isUsed: false
        }
    });
    if (!savedOtp) {

        return res.status(404).json(new response(404, "OTP not found or Already used", false));
    }
    if (savedOtp.otpCode !== otp) {
        return res.status(401).json(new response(401, "Invalid OTP", false));
    }
    if (savedOtp.expiresAt < new Date()) {
        const deleteOTP = await prisma.otp.delete({
            where: {
                id: savedOtp.id
            }
        });
        if (deleteOTP) {
            return res.status(401).json(new response(401, "OTP expired", false));
        }
    }
    if (savedOtp.otpCode === otp) {
        const updateOTP = await prisma.otp.update({
            where: {
                id: savedOtp.id
            },
            data: {
                isUsed: true
            }
        });
        await prisma.user.update({
            where: {
                email
            },
            data: {
                role: "USER"
            }
        })
        if (updateOTP) {
            return res.status(200).json(new response(200, "OTP verified successfully", true));
        }
    }


})
export default verifyOTP;