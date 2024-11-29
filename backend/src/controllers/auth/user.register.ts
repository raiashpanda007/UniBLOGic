import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z as zod } from "zod";
import { asyncHandler,response } from "../../utilities/utilities";
import bcrypt from "bcrypt";
import userexist from "./user.exist";
import error from "../../utilities/error"; 
import loginUser from "./login"

const prisma = new PrismaClient();

const register = asyncHandler(async (req: Request, res: Response) => {
    const userschema = zod.object({
        name: zod.string().min(3, "Please provide your name").max(255),
        email: zod.string().email("Invalid email").max(255),
        password: zod.string().min(8).max(255),
        username: zod.string().min(3, "Please provide a username").max(255),
    });

    try {
        console.log("Registering user:", req.body);
        // Validate the request body
        const parsed = userschema.safeParse(req.body);
        if (!parsed.success) {
            console.error("Validation Error:", parsed.error.errors);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: parsed.error.errors,
            });
        }

        const { name, email, password, username } = parsed.data;

        // Check if user exists
        if (await userexist(email, username)) {
            console.error("User already exists:", { email, username });
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const cryptedPassword = await bcrypt.hash(password, 10);

        // Store the user in the database
        const storeUser = await prisma.user.create({
            data: {
                name,
                email,
                password: cryptedPassword,
                username,
                role: "EXTERNAL",
            },
        });

        // Check if user creation failed
        if (!storeUser) {
            console.error("User creation failed:", { name, email, username });
            return res.status(500).json({
                success: false,
                message: "User not created",
            });
        }

        const result = await loginUser({ username, password });

        const options = {
            httpOnly: true,
            sameSite: false,
        };

        return res
            .status(200)
            .cookie("refreshToken", result.refreshToken, options)
            .json({
                success: true,
                message: result.message,
            });
    } catch (err) {
        console.error("Unexpected Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});




export default register;
