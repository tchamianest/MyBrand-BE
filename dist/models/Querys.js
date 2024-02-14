"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const message = new mongoose_1.default.Schema({
    email: String,
    messages: String,
    reply: { type: String, default: "" },
});
const Message = mongoose_1.default.model("message", message);
exports.default = Message;
