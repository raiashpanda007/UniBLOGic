"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class response {
    constructor(statusCode, message = "Success", data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
    }
}
exports.default = response;
