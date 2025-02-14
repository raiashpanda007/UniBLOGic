import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promises-based version of fs for async/await
import dotenv from "dotenv"
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadCloudinary = async (localFilePath : string ) => {


  try {
    if (!localFilePath) return null;
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded:", res);

    if (res) {
      // Remove the file locally after upload
      await fs.unlink(localFilePath);
    }

    return res;
  } catch (error) {
    console.log("Upload error:", error);

    // Clean up by removing the file even if an error occurs
    await fs.unlink(localFilePath);
    return null;
  }
};

export default uploadCloudinary;
