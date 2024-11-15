"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/users/user.controller");
const verify_middleware_1 = __importDefault(require("../middleware/verify.middleware"));
const router = (0, express_1.Router)();
router.route("/all_users").get(verify_middleware_1.default, user_controller_1.showAllUsers);
exports.default = router;
