"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
//SPECIFIE THE STORAGE ENGINE OF MULTER
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
///// MAKE VALIDATION OF IMAGE BEFORE TO UPLOAD
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/raw",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        const error = new Error("unsupported file formate");
        cb(error, false);
    }
};
const uploads = (0, multer_1.default)({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 },
    fileFilter: (req, file, cb) => fileFilter,
});
exports.default = uploads;
