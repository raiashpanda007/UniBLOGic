import crypto from 'crypto';

const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
    return otp;
}

export default generateOTP;