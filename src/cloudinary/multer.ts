import multer from "multer";
import { Request, Response } from "express";

//SPECIFIE THE STORAGE ENGINE OF MULTER

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "./uploads");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

///// MAKE VALIDATION OF IMAGE BEFORE TO UPLOAD
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/raw",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error: Error = new Error("unsupported file formate");
    cb(error, false);
  }
};

const uploads = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => fileFilter,
});

export default uploads;
