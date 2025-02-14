import multer from 'multer';
import { Response, Request, NextFunction } from 'express';
import path from 'path'; // Required to get the file extension
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique identifiers

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets'); // Ensure the correct folder path
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname); // Extract original file extension
        // Generate a unique filename using UUID and timestamp
        cb(null, `${file.fieldname}-${Date.now()}-${uuidv4()}${extension}`);
    }
});

export const upload = multer({ storage });
