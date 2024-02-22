import express from "express";
import mongoose from "mongoose";
import router from "./models/router";
import cookieParser from "cookie-parser";
import passport from "passport";
import bodyParser from "body-parser";
import Users from "./models/users";
import "./jwt/authe";
///BODY PARSER
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", passport.authenticate("jwt", { session: false }), router);
app.use(function (err: any, req: any, res: any, next: any) {
  res.status(err.status || 500);
  res.json({ error: err });
});

////CONNECTING TO MY DATABASE
const PORT = 8000;
mongoose
  .connect(
    "mongodb+srv://tchamianest:ZDKDJ5G7px4pdgbR@cluster0.9cr0mrz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.use(express.json());
    passport.initialize();
    app.use("/api", router);
    app.listen(PORT, () => {
      console.log("welcome");
    });
  })

  .catch((error: Error) => {
    console.error(error.message);
  });
mongoose.Promise = global.Promise;
