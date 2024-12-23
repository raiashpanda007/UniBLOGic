import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";



const RESOLUTIONS = [
  { name: "FHD", width: 1920, height: 1080 },
  { name: "HD", width: 1280, height: 720 },
  { name: "SD", width: 854, height: 480 },
  { name: "360p", width: 640, height: 360 },
];

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA42PHHPIS72PSVJJI",
    secretAccessKey: "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",
  },
});

const bucket_name = process.env.BUCKET_NAME;
const key = process.env.KEY;

const init = async function () {
  try {
    // Step 1: Download the video file from S3
    const command = new GetObjectCommand({
      Bucket: bucket_name,
      Key: key,
    });

    const result = await s3Client.send(command);
    const originalFilename = path.basename(key); // Extract the original filename
    const originalPath = path.resolve(originalFilename);

    // Save the video file locally
    await fs.promises.writeFile(originalPath, await result.Body.transformToByteArray());

    // Step 2: Transcode the video to multiple resolutions and upload to S3
    const promises = RESOLUTIONS.map((resolution) => {
      const outputFilename = `${originalFilename}.${resolution.name}.mp4`;

      return new Promise((resolve, reject) => {
        ffmpeg(originalPath)
          .output(outputFilename)
          .withVideoCodec("libx264")
          .withAudioCodec("aac")
          .withSize(`${resolution.width}x${resolution.height}`)
          .on("end", async () => {
            try {
              // Upload the transcoded video file to S3
              const putCommand = new PutObjectCommand({
                Bucket: "transcoded-videos-uniblogic",
                Key: outputFilename,
                Body: fs.createReadStream(path.resolve(outputFilename)),
              });

              await s3Client.send(putCommand);
              resolve();
            } catch (error) {
              reject(error);
            }
          })
          .format("mp4")
          .run();
      });
    });

    // Wait for all transcoding and uploads to complete
    await Promise.all(promises);
    
    console.log("Transcoding and uploading completed.");
  } catch (error) {
    console.error("Error in the process:", error);
  }
};

init().finally(()=> process.exit(0));
