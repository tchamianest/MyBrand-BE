import * as cloudinaryLib from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//

export const Cloudinaryuploads = (
  file: string,
  folder: string
): Promise<{ url: string; id: string }> => {
  return new Promise((resolve) => {
    const uploadOptions: cloudinaryLib.UploadApiOptions = {
      resource_type: "auto",
      folder: folder,
    };
    cloudinary.uploader.upload(file, uploadOptions, (result: any) => {
      resolve({
        url: result.url,
        id: result.public_id,
      });
    });
  });
};
