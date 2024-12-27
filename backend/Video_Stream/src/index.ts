import { ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import type { S3Event } from 'aws-lambda';
import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs';
import cluster from "cluster";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
    accessKeyId: "AKIA42PHHPISVV2U76FH",
    secretAccessKey: "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"
};

const client = new SQSClient({ region: "ap-south-1", credentials });
const ecsClient = new ECSClient({ region: "ap-south-1", credentials });

const command = new ReceiveMessageCommand({
    QueueUrl: "https://sqs.ap-south-1.amazonaws.com/881490098725/VideoHLSBitrate",
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 20
});

async function receiveMessage() {
    while (true) {
        const { Messages } = await client.send(command);
        if (!Messages) {
            console.log("No message is received");
            continue;
        }

        try {
            for (const message of Messages) {
                const { Body, MessageId } = message;
                if (!Body) continue;

                const event = JSON.parse(Body) as S3Event;
                if ("Service" in event && "Event" in event) {
                    if (event.Service === "s3:TestEvent") continue;
                }

                for (const record of event.Records) {
                    const { s3 } = record;
                    const { bucket, object } = s3;
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
                                    { name: "KEY", value: object.key }
                                ]
                            }]
                        }
                    });

                    await ecsClient.send(runTaskCommand);
                }
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
}

receiveMessage();
