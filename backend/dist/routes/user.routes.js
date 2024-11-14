"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/users/user.controller");
const requestOTP_1 = __importDefault(require("../controllers/otp/requestOTP"));
const router = (0, express_1.Router)();
router.route("/register").post(user_controller_1.register);
router.route("/requestotp").get(requestOTP_1.default);
router.route("/verifyotp").get();
exports.default = router;
