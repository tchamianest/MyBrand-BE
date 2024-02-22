"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// const image = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req: any, file: any, cb: any) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".png" && ext != ".jpeg") {
//       cb(new Error("File is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });
const localFolder = "src/uploads"; // Specify the local folder where you want to save the file locally
// Check if the local folder exists, create it if not create new one
if (!fs_1.default.existsSync(localFolder)) {
    fs_1.default.mkdirSync(localFolder);
}
const image = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, localFolder);
        },
        filename: (req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const uniqueFilename = Date.now() + "-" + file.originalname;
            cb(null, uniqueFilename);
        },
    }),
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
            cb(new Error("File is not supported"), false);
            return;
        }
        cb(null, true);
    },
});
exports.default = image;
