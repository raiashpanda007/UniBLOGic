"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const utilities_1 = require("../../utilities/utilities");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_exist_1 = __importDefault(require("./user.exist"));
const error_1 = __importDefault(require("../../utilities/error")); // Import your custom error class
const prisma = new client_1.PrismaClient();
const register = (0, utilities_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userschema = zod_1.z.object({
        name: zod_1.z.string().min(3, "Please provide your name").max(255),
        email: zod_1.z.string().email("Invalid email").max(255),
        password: zod_1.z.string().min(8).max(255),
        username: zod_1.z.string().min(3, "Please provide a username").max(255),
    });
    // Validate the request body
    const parsed = userschema.safeParse(req.body);
    if (!parsed.success) {
        // Directly send an error response
        const validationError = new error_1.default(400, "Invalid data", parsed.error.errors);
        return res.status(validationError.statusCode).json({
            success: validationError.success,
            message: validationError.message,
            errors: validationError.errors,
        });
    }
    const { name, email, password, username } = parsed.data;
    // Check if user exists
    if (yield (0, user_exist_1.default)(email, username)) {
        // Directly send an error response
        const userExistsError = new error_1.default(400, "User already exists");
        return res.status(userExistsError.statusCode).json({
            success: userExistsError.success,
            message: userExistsError.message,
        });
    }
    // Hash the password
    const cryptedPassword = yield bcrypt_1.default.hash(password, 10);
    // Store the user in the database
    const storeUser = yield prisma.user.create({
        data: {
            name,
            email,
            password: cryptedPassword,
            username,
            role: "USER",
        },
    });
    // Check if user creation failed
    if (!storeUser) {
        const userCreationError = new error_1.default(400, "User not created");
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
}));
exports.default = register;
