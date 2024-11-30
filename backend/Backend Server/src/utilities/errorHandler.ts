// errorHandler.ts
import { Request, Response, NextFunction } from "express";
import error from "./error"; // Adjust the path as needed

const errorHandler = (err: error, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message || "An unexpected error occurred",
        errors: err.errors || [],
        data: err.data || null,
    });
};

export default errorHandler;
