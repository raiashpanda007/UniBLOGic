import multer from 'multer';
import { Response,Request,NextFunction } from 'express';
import path from 'path'; // Required to get the file extension

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets'); // Ensure the correct folder path
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname); // Extract original file extension
        // Simply use the field name as the file name, such as profilePicture or coverImage
        cb(null, file.fieldname + extension); // e.g., profilePicture.jpg, coverImage.png
    }
});

export const upload = multer({ storage });