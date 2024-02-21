import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "dxvaqb92w",
  api_key: "391162335997521",
  api_secret: "FfS6gAf-ED_gRQrkjXIYLRZxSaI",
});
//

// export const Cloudinaryuploads = (
//   file: string,
//   folder: string
// ): Promise<{ url: string; id: string }> => {
//   return new Promise((resolve) => {
//     const uploadOptions: cloudinaryLib.UploadApiOptions = {
//       resource_type: "auto",
//       folder: folder,
//     };
//     cloudinary.uploader.upload(file, uploadOptions, (result: any) => {
//       resolve({
//         url: result.url,
//         id: result.public_id,
//       });
//     });
//   });
// };

// export const Cloudinaryuploads = new CloudinaryStorage({
//   cloudinary,
//   allowedFormats: ["jpg", "png", "jpeg", "gif"],
//   params: {
//     folder: "MYBRAND",
//     transformation: [{ width: 500, height: 500, crop: "limit" }],
//   },
// });

export default cloudinary;
