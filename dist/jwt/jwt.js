"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validatetoken = exports.Tokencreate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const secretKey = process.env.TOKENCREATERA;
const Tokencreate = (user) => {
    if (!secretKey) {
        return new Error("Token secret is undefined");
    }
    const accessToken = (0, jsonwebtoken_1.sign)({ username: user.username, id: user._id }, "tchamianest@12345");
    return accessToken;
};
exports.Tokencreate = Tokencreate;
const Validatetoken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    console.log(req.cookies["access-token"]);
    if (!accessToken) {
        return res.status(400).json({ error: "Please first login " });
    }
    try {
        const validtoken = (0, jsonwebtoken_1.verify)(accessToken, "tchamianest@12345");
        if (validtoken) {
            req.authenticated = true;
            return next();
        }
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
exports.Validatetoken = Validatetoken;
