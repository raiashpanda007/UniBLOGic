import { WebSocketServer } from "ws";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
    console.log("Client connected");

});
