import mongoose from "mongoose";

import "./jwt/authe";
import app from "./app";
///BODY PARSER

////CONNECTING TO MY DATABASE
const PORT = 8000;
mongoose
  .connect(
    "mongodb+srv://tchamianest:ZDKDJ5G7px4pdgbR@cluster0.9cr0mrz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("welcome");
    });
  })

  .catch((error: Error) => {
    console.error(error.message);
  });
mongoose.Promise = global.Promise;
