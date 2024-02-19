"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloudinaryuploads = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
//
const Cloudinaryuploads = (file, folder) => {
    return new Promise((resolve) => {
        const uploadOptions = {
            resource_type: "auto",
            folder: folder,
        };
        cloudinary_1.v2.uploader.upload(file, uploadOptions, (result) => {
            resolve({
                url: result.url,
                id: result.public_id,
            });
        });
    });
};
exports.Cloudinaryuploads = Cloudinaryuploads;
