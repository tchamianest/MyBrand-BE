import express from "express";
import mongoose from "mongoose";
import router from "./models/router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
///BODY PARSER
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

////CONNECTING TO MY DATABASE
const PORT = 8000;
mongoose
  .connect(
    "mongodb+srv://tchamianest:ZDKDJ5G7px4pdgbR@cluster0.9cr0mrz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.use(express.json());
    app.use(cookieParser());
    app.use("/api", router);
    app.listen(PORT, () => {
      console.log("welcome");
    });
  })

  .catch((error: Error) => {
    console.error(error.message);
  });
