import { Response,Request } from "express";
import {asyncHandler} from "../../utilities/utilities";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createCommunity = asyncHandler(async(req,res)=>{
    

})