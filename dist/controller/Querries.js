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
exports.Replymessage = exports.Getallmessage = exports.Createmessage = void 0;
const Querys_1 = __importDefault(require("../models/Querys"));
const validation_1 = require("../validation/validation");
const Createmessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messagecheck = (0, validation_1.Messagevalidation)(req.body);
        if (messagecheck.error) {
            res.send(messagecheck.error);
            return;
        }
        const message = new Querys_1.default({
            email: req.body.email,
            messages: req.body.messages,
            reply: "",
        });
        yield message.save();
        res.status(200).json({ status: "success", message });
    }
    catch (error) {
        res.status(400).json({
            status: "Success",
            message: "fail to create a message",
            Error: error,
        });
    }
});
exports.Createmessage = Createmessage;
const Getallmessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield Querys_1.default.find();
        res.status(200).json({ status: "Success", message });
    }
    catch (error) {
        res.status(400).json({
            status: "Success",
            message: "fail to Get all message",
            Error: error,
        });
    }
});
exports.Getallmessage = Getallmessage;
const Replymessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield Querys_1.default.findOne({ _id: req.params.id });
        if (!message) {
            res
                .status(404)
                .json({ status: "Fail", error: "these message are no longer Exist !" });
            return;
        }
        if (req.body.reply) {
            message.reply = req.body.reply;
        }
        yield message.save();
        res.status(200).json({ status: "Success", message });
    }
    catch (error) {
        res
            .status(400)
            .json({ status: "Success", message: "fail to reply", Error: error });
    }
});
exports.Replymessage = Replymessage;
