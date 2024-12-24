import { SQSClient,ReceiveMessageCommand , DeleteMessageCommand} from "@aws-sdk/client-sqs";
import type {S3Event} from 'aws-lambda'
import {ECSClient,RunTaskCommand} from '@aws-sdk/client-ecs'
import dotenv from "dotenv"
dotenv.config()
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

async function receiveMessage() {
    while(true) {
        const {Messages} = await client.send(command);
        if(!Messages) {
            console.log("No message is recieved")
            continue;
        }


        try {
            for(const message of Messages) {
                const {Body,MessageId} = message;
                console.log("Message",message);
                if(!Body) continue;

                // Validate that this is an s3 event
                const event = JSON.parse(Body) as S3Event;
                if("Service" in event && "Event" in event) {
                    if(event.Service === "s3:TestEvent") continue;
                    

                }
                for (const record of event.Records) {
                    const {s3} = record;
                    const {bucket,object} = s3;
                    const runTaskCommand = new RunTaskCommand({
                        taskDefinition:"arn:aws:ecs:ap-south-1:881490098725:task-definition/video-transcoder",
                        cluster:"arn:aws:ecs:ap-south-1:881490098725:cluster/videotranscoderdev",
                        launchType:"FARGATE",
                        networkConfiguration:{
                            awsvpcConfiguration:{
                                subnets:["subnet-0e60bd81d60c2f11b","subnet-005ceaf386d3ca296","subnet-0160a1d5f655e2212"],
                                securityGroups:['sg-0ea5c898b2a293a4d'],
                                assignPublicIp:"ENABLED"
                            }
                        },
                        overrides:{
                            containerOverrides:[{
                                name:"video-transcoder",
                                environment:[
                                    {name:"BUCKET_NAME",value:bucket.name},
                                    {name:"KEY",value:object.key}
                                ]
                            }]
                        }

                    });
                    const response = await ecsClient.send(runTaskCommand);
                    
                    await client.send(new DeleteMessageCommand({
                        QueueUrl: process.env.AWS_SQS_URL_VIDEO_UPLOADING || "",
                        ReceiptHandle: message.ReceiptHandle
                    }))
                }

            }
        } catch (error) {
            console.log("Error in processing message",error)
            
        }

    }
   
}

receiveMessage();