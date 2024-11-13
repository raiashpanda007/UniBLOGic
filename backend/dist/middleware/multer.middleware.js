"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path")); // Required to get the file extension
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets'); // Ensure the correct folder path
    },
    filename: function (req, file, cb) {
        const extension = path_1.default.extname(file.originalname); // Extract original file extension
        // Simply use the field name as the file name, such as profilePicture or coverImage
        cb(null, file.fieldname + extension); // e.g., profilePicture.jpg, coverImage.png
    }
});
exports.upload = (0, multer_1.default)({ storage });
