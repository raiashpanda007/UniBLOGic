import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const video_process = async (key: string) => {
    const s3Client = new S3Client({ region: "ap-south-1" });
    const params = {
        Bucket: "video-hls-uniblogic",
        Prefix: key,
        Delimiter: "/", // Ensures we get "folders" as CommonPrefixes
    };

    try {
        const command = new ListObjectsV2Command(params);
        const result = await s3Client.send(command);

        // Extract quality folders from CommonPrefixes
        const qualitiesList = result.CommonPrefixes?.map((item) =>
            item.Prefix?.split('.').pop()?.replace(/\/$/, "") // Extract the last part after "." and remove trailing slash
        );
        console.log("Normalized Qualities List:", qualitiesList);

        // Define the expected quality folders
        const expectedQualities = ["SD", "HD" ,"FHD"];

        // Check if all expected qualities are present
        if (
            qualitiesList &&
            expectedQualities.every((quality) => qualitiesList.includes(quality))
        ) {
            console.log("All expected qualities are present");
            return true;
        }
    } catch (error) {
        console.error("Error checking video processing status:", error);
    }

    return false;
};

export default video_process;
