import {S3Client, ListObjectsV2Command} from '@aws-sdk/client-s3';
const video = {
    '360p':'',
    'SD':'',
    'HD':'',
    'FHD':''
}

const videoList = async (key:string) =>{
    const s3Client = new S3Client({region:'ap-south-1'});

    const params = {
        Bucket:'video-hls-uniblogic',
        Prefix:key,
        Delimiter: '/'
    }
    try {
        const command = new ListObjectsV2Command(params);
        const result = await s3Client.send(command);
        const qualitiesList = result.CommonPrefixes?.map((item)=>item.Prefix);
        console.log(qualitiesList);
        qualitiesList?.forEach((item)=>{
            if(item?.includes('FHD')){
                video['FHD'] = `https://video-hls-uniblogic.s3.ap-south-1.amazonaws.com/${item}index.m3u8`;
            } else if(item?.includes('SD')){
                video['SD'] = `https://video-hls-uniblogic.s3.ap-south-1.amazonaws.com/${item}index.m3u8`;
            }
            else if(item?.includes('HD')){
                video['HD'] = `https://video-hls-uniblogic.s3.ap-south-1.amazonaws.com/${item}index.m3u8`;
            }
            
        })
        
    } catch (error) {
        console.log(error);
    }

    return video;

}


export default videoList