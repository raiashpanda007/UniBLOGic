import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"
const video_uploading = async (key: string) => {
    const s3Client = new S3Client({ region: process.env.AWS_REGION });
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: key
    }
    try {
        const command = new ListObjectsV2Command(params);
        const result = await s3Client.send(command);
        const fileExist = result.Contents?.length ? true : false;
        if(fileExist){
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
    return false;
}
export default video_uploading;
