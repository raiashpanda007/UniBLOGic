"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_sqs_1 = require("@aws-sdk/client-sqs");
const client_ecs_1 = require("@aws-sdk/client-ecs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};
const client = new client_sqs_1.SQSClient({ region: "ap-south-1", credentials });
const ecsClient = new client_ecs_1.ECSClient({ region: "ap-south-1", credentials });
const command = new client_sqs_1.ReceiveMessageCommand({
    QueueUrl: process.env.AWS_SQS_URL_VIDEO_UPLOADING || "",
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 20, // Long polling
});
function receiveMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            try {
                const { Messages } = yield client.send(command);
                if (!Messages || Messages.length === 0) {
                    console.log("No message received, waiting...");
                    continue; // Wait for next poll
                }
                for (const message of Messages) {
                    const { Body, MessageId, ReceiptHandle } = message;
                    if (!Body || !ReceiptHandle)
                        continue;
                    try {
                        const event = JSON.parse(Body);
                        if ("Service" in event && "Event" in event) {
                            if (event.Service === "s3:TestEvent")
                                continue;
                        }
                        for (const record of event.Records) {
                            const { s3 } = record;
                            const { bucket, object } = s3;
                            console.log(`Processing video: ${bucket.name}/${object.key}`);
                            const runTaskCommand = new client_ecs_1.RunTaskCommand({
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
                            yield ecsClient.send(runTaskCommand);
                            console.log(`Task started for video: ${bucket.name}/${object.key}`);
                        }
                        // Delete the processed message
                        const deleteCommand = new client_sqs_1.DeleteMessageCommand({
                            QueueUrl: process.env.AWS_SQS_URL_VIDEO_UPLOADING || "",
                            ReceiptHandle,
                        });
                        yield client.send(deleteCommand);
                        console.log(`Deleted message: ${MessageId}`);
                    }
                    catch (error) {
                        console.error("Error processing message:", error);
                    }
                }
            }
            catch (error) {
                console.error("Error receiving message:", error);
            }
        }
    });
}
receiveMessage();
