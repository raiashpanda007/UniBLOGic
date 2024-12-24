import {asyncHandler, response , error} from '../../utilities/utilities'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client,PutObjectCommand } from '@aws-sdk/client-s3';
import {v4 as uuidv4} from 'uuid';
const uploadVideo = asyncHandler(async(req,res) =>{
    const {key,type} = req.body;
    if(!key || !type){
        return new error(400,"Please provide key and type");
    }
    const newkey = uuidv4()+key;
    const credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || " ",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || " ",
    }
    try {
        const client = new S3Client({ region: process.env.AWS_REGION,credentials});
        const command  = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${newkey}.mp4`,
            ContentType: 'video/mp4',
        })
        
        const url = await getSignedUrl(client,command,{expiresIn: 60*2});
        console.log(url);
        return res.status(200).json(new response(200,"Url generated successfully",{url:url, key:key}));
    } catch (e) {
        throw new error(500,"Error generating url");
    }

});
export default uploadVideo;