import multer from "multer";
// import { Request } from "express";
import path from "path";
import fs from "fs";

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
if (!fs.existsSync(localFolder)) {
  fs.mkdirSync(localFolder);
}

const image = multer({
  storage: multer.diskStorage({
    destination: (req: any, file, cb) => {
      cb(null, localFolder);
    },
    filename: (req: any, file, cb) => {
      // const ext = path.extname(file.originalname);
      const uniqueFilename = Date.now() + "-" + file.originalname;
      cb(null, uniqueFilename);
    },
  }),
  fileFilter: (req: any, file, cb: any) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export default image;
