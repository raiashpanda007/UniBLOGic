import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";

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
    const originalFilename = path.basename(key, path.extname(key)); // Extract the filename without extension
    const originalPath = path.resolve(`${originalFilename}${path.extname(key)}`);

    // Save the video file locally
    await fs.promises.writeFile(originalPath, await result.Body.transformToByteArray());

    // Step 2: Transcode the video to HLS format
    const hlsFolder = path.join(path.resolve(), originalFilename);
    fs.mkdirSync(hlsFolder, { recursive: true }); // Create a folder for HLS segments and index file

    return new Promise((resolve, reject) => {
      ffmpeg(originalPath)
        .outputOptions([
          "-codec:v libx264",
          "-codec:a aac",
          "-hls_time 10",
          "-hls_playlist_type vod",
          `-hls_segment_filename ${path.join(hlsFolder, "segment%03d.ts")}`,
        ])
        .output(path.join(hlsFolder, "index.m3u8"))
        .on("end", async () => {
          try {
            // Upload HLS folder (index.m3u8 and segments) to S3
            const files = fs.readdirSync(hlsFolder);
            const uploadPromises = files.map((file) => {
              const filePath = path.join(hlsFolder, file);
              const putCommand = new PutObjectCommand({
                Bucket: 'video-hls-uniblogic',
                Key: `${originalFilename}/${file}`,
                Body: fs.createReadStream(filePath),
              });

              return s3Client.send(putCommand);
            });

            await Promise.all(uploadPromises);
            console.log("HLS transcoding and uploading completed.");
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on("error", (err) => {
          console.error("Error during transcoding:", err);
          reject(err);
        })
        .run();
    });
  } catch (error) {
    console.error("Error in the process:", error);
  }
};

init().finally(() => process.exit(0));
