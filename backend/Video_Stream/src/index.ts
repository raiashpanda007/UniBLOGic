import { ReceiveMessageCommand, DeleteMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import type { S3Event } from 'aws-lambda';
import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs';
import dotenv from "dotenv";

dotenv.config();

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};

const client = new SQSClient({ region: "ap-south-1", credentials });
const ecsClient = new ECSClient({ region: "ap-south-1", credentials });

const command = new ReceiveMessageCommand({
    QueueUrl: process.env.AWS_SQS_URL_VIDEO_UPLOADING || "",
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 20, // Long polling
});

async function receiveMessage() {
    while (true) {
        try {
            const { Messages } = await client.send(command);

            if (!Messages || Messages.length === 0) {
                console.log("No message received, waiting...");
                continue; // Wait for next poll
            }

            for (const message of Messages) {
                const { Body, MessageId, ReceiptHandle } = message;
                if (!Body || !ReceiptHandle) continue;

                try {
                    const event = JSON.parse(Body) as S3Event;
                    if ("Service" in event && "Event" in event) {
                        if (event.Service === "s3:TestEvent") continue;
                    }

                    for (const record of event.Records) {
                        const { s3 } = record;
                        const { bucket, object } = s3;

                        console.log(`Processing video: ${bucket.name}/${object.key}`);

                        const runTaskCommand = new RunTaskCommand({
                            taskDefinition: "arn:aws:ecs:ap-south-1:881490098725:task-definition/video-streaming",
                            cluster: "arn:aws:ecs:ap-south-1:881490098725:cluster/video-streaming",
                            launchType: "FARGATE",
                            networkConfiguration: {
                                awsvpcConfiguration: {
                                    subnets: ["subnet-0e60bd81d60c2f11b", "subnet-005ceaf386d3ca296", "subnet-0160a1d5f655e2212"],
                                    securityGroups: ['sg-0ea5c898b2a293a4d'],
                                    assignPublicIp: "ENABLED"
                                }
                            },
                            overrides: {
                                containerOverrides: [{
                                    name: "video-streaming",
                                    environment: [
                                        { name: "BUCKET_NAME", value: bucket.name },
                                        { name: "KEY", value: object.key },
                                    ],
                                }],
                            },
                        });

                        // Start the container task
                        await ecsClient.send(runTaskCommand);
                        console.log(`Task started for video: ${bucket.name}/${object.key}`);
                    }

                    // Delete the processed message
                    const deleteCommand = new DeleteMessageCommand({
                        QueueUrl: process.env.AWS_SQS_URL_VIDEO_UPLOADING || "",
                        ReceiptHandle,
                    });
                    await client.send(deleteCommand);
                    console.log(`Deleted message: ${MessageId}`);
                } catch (error) {
                    console.error("Error processing message:", error);
                }
            }
        } catch (error) {
            console.error("Error receiving message:", error);
        }
    }
}

receiveMessage();
