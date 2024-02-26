import mongoose from "mongoose";

import "./jwt/authe";
import app from "./app";
///BODY PARSER
const DB: any = process.env.MONGO_DB_CONNECT;
////CONNECTING TO MY DATABASE
const PORT = 8000;
mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log("welcome");
    });
  })

  .catch((error: Error) => {
    console.error(error.message);
  });
mongoose.Promise = global.Promise;
