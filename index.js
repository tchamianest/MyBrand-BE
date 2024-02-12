const express = require("express");
const mongoose = require("mongoose");
const routes = require("./models/router");

////CONNECTING TO MY DATABASE
const PORT = process.env.PORT || 3000;
mongoose
  .connect(
    "mongodb+srv://tchamianest:ZDKDJ5G7px4pdgbR@cluster0.9cr0mrz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", routes);

    app.listen(PORT, () => {
      console.log("welcome");
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
