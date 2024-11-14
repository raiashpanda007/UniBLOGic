import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z as zod } from "zod";
import { asyncHandler } from "../../utilities/utilities";
import bcrypt from "bcrypt";
import userexist from "./user.exist";
import error from "../../utilities/error"; // Import your custom error class

const prisma = new PrismaClient();

const register = asyncHandler(async (req: Request, res: Response) => {
    const userschema = zod.object({
        name: zod.string().min(3, "Please provide your name").max(255),
        email: zod.string().email("Invalid email").max(255),
        password: zod.string().min(8).max(255),
        username: zod.string().min(3, "Please provide a username").max(255),
    });

    // Validate the request body
    const parsed = userschema.safeParse(req.body);
    if (!parsed.success) {
        // Directly send an error response
        const validationError = new error(400, "Invalid data", parsed.error.errors);
        return res.status(validationError.statusCode).json({
            success: validationError.success,
            message: validationError.message,
            errors: validationError.errors,
        });
    }

    const { name, email, password, username } = parsed.data;

    // Check if user exists
    if (await userexist(email, username)) {
        // Directly send an error response
        const userExistsError = new error(400, "User already exists");
        return res.status(userExistsError.statusCode).json({
            success: userExistsError.success,
            message: userExistsError.message,
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
        const userCreationError = new error(400, "User not created");
        return res.status(userCreationError.statusCode).json({
            success: userCreationError.success,
            message: userCreationError.message,
        });
    }

    // Success response
    return res.status(201).json({
        message: "User created",
        success: true,
        data: storeUser,
    });
});

export default register;
