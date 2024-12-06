import { asyncHandler, response, error } from '../../../utilities/utilities';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const verifyOTP_forgot = asyncHandler(async (req, res) => {
            const { otp, password, email } = req.body;
            console.log("Email:", email);
            console.log("Password", password);
            console.log("OTP:", otp);
        
            if (!otp || !email || !password) {
                return res.status(400).json(new response(400, "OTP and email and Password are required ", false));
            }
        
        
            try {
                const savedOTP = await prisma.otp.findFirst({
                    where: {
                        email: email,
                        isUsed: false
                    }
        
                })
        
                if (!savedOTP) {
                    return res.status(404).json(new error(404, "OTP not found or already used"));
                }
        
                if (savedOTP.expiresAt < new Date()) {
                    await prisma.otp.delete({
                        where: {
                            id: savedOTP.id
                        }
                    })
                    return res.status(401).json(new error(401, "OTP expired"));
                }
                console.log("Saved OTP",savedOTP);
                console.log("OTP",otp);
                if (savedOTP.otpCode == otp) {
                    const updatePassword = await prisma.$transaction([
                        prisma.otp.update({
                            where: { id: savedOTP.id },
                            data: { isUsed: true }
                        }),
                        prisma.user.update({
                            where: { email: email },
                            data: { password: await bcrypt.hash(password, 10) }
                        })
                    ])
                    if (!updatePassword) {
                        return res.status(400).json(new error(400, "Failed to update password"));
                    }
                    else {
                        return res.status(200).json(new response(200, "OTP verifies password updated", {
                            message: "Password has been updated"
                        }))
                    }
        
                }
                else{
                    return res.status(400).json(new error(400, "Invalid OTP"));
                }
        
        
        
            } catch (e) {
                return res.status(404).json(new error(404, "OTP not found or already used"));
            }
        
        
        })


export default verifyOTP_forgot;