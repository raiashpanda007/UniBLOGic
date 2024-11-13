"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/users/user.controller");
const router = (0, express_1.Router)();
router.route("/register").post(user_controller_1.register);
exports.default = router;
