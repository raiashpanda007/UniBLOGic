import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { string, z as zod } from "zod";
import { asyncHandler,response,error } from "../../utilities/utilities";
import bcrypt from "bcrypt";
import userexist from "./user.exist";
import loginUser from "./login"

const prisma = new PrismaClient();

const register = asyncHandler(async (req: Request, res: Response) => {
    const userschema = zod.object({
        name: zod.string().min(3, "Please provide your name").max(255),
        email: zod.string().email("Invalid email").max(255),
        password: zod.string().min(8).max(255),
        username: zod.string().min(3, "Please provide a username").max(255),
        batch: zod.preprocess((value) => Number(value), zod.number().min(2018).optional()),
        branch: zod.enum(["CSE", "ECE", "MEA", "MNC", "None"]).optional(),
    });

    try {
        console.log("Registering user:", req.body);
        if(req.body.email.endsWith("@iiitbh.ac.in")){
            const {branch,batch} = req.body;
            if(!branch || !batch) {
                return res.status(400).json(new response(400,"Please provide batch and branch",{}));
            }
        }
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

        const { name, email, password, username,branch,batch } = parsed.data;

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
                branch:branch || null,
                batch:batch||null
                

            },
        });

        // Check if user creation failed
        if (!storeUser) {
            console.error("User creation failed:", { name, email, username });
            return res.status(500).json(new error(400,"Unable to create a user")
            );
        }

        const result = await loginUser({ username, password });

        const options = {
            httpOnly: true,
            sameSite: false,
        };
        if(!result.loggedInUser) {
            return res.status(400).json(new response(200,"Unexpected error of result.loggedInuser",{}))
        }

        return res
            .status(200)
            .cookie("refreshToken", result.refreshToken, options)
            .json(new response(200,"Registered Success",result.loggedInUser));
    } catch (err) {
        console.error("Unexpected Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});




export default register;
