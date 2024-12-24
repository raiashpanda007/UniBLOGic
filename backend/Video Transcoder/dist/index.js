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
    accessKeyId: "AKIA42PHHPISVV2U76FH",
    secretAccessKey: "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"
};
const client = new client_sqs_1.SQSClient({ region: "ap-south-1", credentials });
const ecsClient = new client_ecs_1.ECSClient({ region: "ap-south-1", credentials });
const command = new client_sqs_1.ReceiveMessageCommand({
    QueueUrl: process.env.AWS_SQS_URL_VIDEO_UPLOADING || "",
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 20
});
function receiveMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const { Messages } = yield client.send(command);
            if (!Messages) {
                console.log("No message is recieved");
                continue;
            }
            try {
                for (const message of Messages) {
                    const { Body, MessageId } = message;
                    console.log("Message", message);
                    if (!Body)
                        continue;
                    // Validate that this is an s3 event
                    const event = JSON.parse(Body);
                    if ("Service" in event && "Event" in event) {
                        if (event.Service === "s3:TestEvent")
                            continue;
                    }
                    for (const record of event.Records) {
                        const { s3 } = record;
                        const { bucket, object } = s3;
                        const runTaskCommand = new client_ecs_1.RunTaskCommand({
                            taskDefinition: "arn:aws:ecs:ap-south-1:881490098725:task-definition/video-transcoder",
                            cluster: "arn:aws:ecs:ap-south-1:881490098725:cluster/videotranscoderdev",
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
                                        name: "video-transcoder",
                                        environment: [
                                            { name: "BUCKET_NAME", value: bucket.name },
                                            { name: "KEY", value: object.key }
                                        ]
                                    }]
                            }
                        });
                        const response = yield ecsClient.send(runTaskCommand);
                        yield client.send(new client_sqs_1.DeleteMessageCommand({
                            QueueUrl: process.env.AWS_SQS_URL_VIDEO_UPLOADING || "",
                            ReceiptHandle: message.ReceiptHandle
                        }));
                    }
                }
            }
            catch (error) {
                console.log("Error in processing message", error);
            }
        }
    });
}
receiveMessage();
