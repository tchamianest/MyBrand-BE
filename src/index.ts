import express from "express";
import mongoose from "mongoose";
import router from "./models/router";
////CONNECTING TO MY DATABASE
const PORT = 8000;
mongoose
  .connect(
    "mongodb+srv://tchamianest:ZDKDJ5G7px4pdgbR@cluster0.9cr0mrz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", router);
    app.listen(PORT, () => {
      console.log("welcome");
    });
  })

  .catch((error: Error) => {
    console.error(error.message);
  });
