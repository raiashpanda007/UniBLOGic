import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const RESOLUTIONS = [
  { name: "FHD", width: 1920, height: 1080 },
  { name: "HD", width: 1280, height: 720 },
  { name: "SD", width: 854, height: 480 },
];

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA42PHHPISVV2U76FH",
    secretAccessKey: "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",
  },
});

const getOriginalResolution = (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        return reject(err);
      }
      const { width, height } = metadata.streams.find((stream) => stream.codec_type === "video");
      resolve({ width, height });
    });
  });
};

const init = async () => {
  const bucketName = process.env.BUCKET_NAME;
  const key = process.env.KEY;

  if (!bucketName || !key) {
    throw new Error("BUCKET_NAME and KEY must be set.");
  }

  const tempDir = path.resolve("/tmp");
  const originalFilename = path.basename(key);
  const originalPath = path.join(tempDir, originalFilename);

  try {
    // Download file
    console.log("Fetching file from S3:", bucketName, key);
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const result = await s3Client.send(command);

    // Save locally
    await fs.promises.writeFile(originalPath, await result.Body.transformToByteArray());
    console.log("File downloaded to:", originalPath);

    // Get original video resolution
    const originalResolution = await getOriginalResolution(originalPath);
    console.log("Original resolution:", originalResolution);

    // Transcode only for resolutions less than or equal to the original
    await Promise.all(
      RESOLUTIONS.filter(
        (resolution) =>
          resolution.width <= originalResolution.width &&
          resolution.height <= originalResolution.height
      ).map((resolution) => {
        const outputFilename = path.join(tempDir, `${originalFilename}.${resolution.name}.mp4`);
        return new Promise((resolve, reject) => {
          ffmpeg(originalPath)
            .output(outputFilename)
            .withVideoCodec("libx264")
            .withAudioCodec("aac")
            .withSize(`${resolution.width}x${resolution.height}`)
            .on("end", async () => {
              console.log("Uploading transcoded file to S3:", outputFilename);
              const putCommand = new PutObjectCommand({
                Bucket: "transcoded-videos-uniblogic",
                Key: `${key}.${resolution.name}.mp4`,
                Body: fs.createReadStream(outputFilename),
              });
              await s3Client.send(putCommand);
              resolve();
            })
            .on("error", reject)
            .format("mp4")
            .run();
        });
      })
    );

    console.log("Transcoding and uploading completed.");
  } catch (error) {
    console.error("Error in process:", error);
  } finally {
    // Clean up
    console.log("Cleaning up temporary files.");
    await fs.promises.unlink(originalPath).catch(() => {});
    RESOLUTIONS.forEach(async (resolution) => {
      const outputFile = path.join(tempDir, `${originalFilename}.${resolution.name}.mp4`);
      await fs.promises.unlink(outputFile).catch(() => {});
    });
  }
};

init().finally(() => process.exit(0));
