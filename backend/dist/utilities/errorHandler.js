"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message || "An unexpected error occurred",
        errors: err.errors || [],
        data: err.data || null,
    });
};
exports.default = errorHandler;
