import { ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import type { S3Event } from 'aws-lambda'
import { ECSClient } from '@aws-sdk/client-ecs'


const credentials = {
    accessKeyId: "AKIA42PHHPISVV2U76FH" ,
    secretAccessKey: "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"
}

const client = new SQSClient({ region: "ap-south-1",credentials });
const ecsClient = new ECSClient({region: "ap-south-1",credentials});

const command = new ReceiveMessageCommand({
    QueueUrl: process.env.AWS_SQS_URL_VIDEO_UPLOADING || "",
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 10,
    WaitTimeSeconds:20
})
async function receiveMessage () {
    while(true) {
        const {Messages} = await client.send(command);
        if(!Messages) {
            console.log("No message is recieved")
            continue;
        }

        try {
            for(const message of Messages) {
                const {Body,MessageId} = message;
                if(!Body) continue;

                const event = JSON.parse(Body) as S3Event;
                if("Service" in event && "Event" in event) {
                    if(event.Service === "s3:TestEvent") continue;
                }
            for(const record of event.Records) {
                
            }
            }
        } catch (error) {
            
        }
    }


}