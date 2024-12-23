import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promises-based version of fs for async/await
import dotenv from "dotenv"
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const reverseURL = (url:string) =>{
    return url.split("").reverse().join("");
}
const deleteSingleFile =  async (fileURL:string) =>{
    const reversedFileURL  =  reverseURL(fileURL);
    const reversedPublicID = reversedFileURL.split(".")[1].split("/")[0];
    const publicID = reverseURL(reversedPublicID);
    const result = await cloudinary.uploader.destroy(publicID,(error,result)=>{
        if(error){
            console.log("Error deleting file:",error);
        }
        console.log("File deleted:",result);
    })
    return result;
}
export default deleteSingleFile;