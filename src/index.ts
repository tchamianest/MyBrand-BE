import mongoose from "mongoose";

import "./jwt/authe";
import app from "./app";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { resolve } from "path";

///BODY PARSER
const DB: any = process.env.MONGO_DB_CONNECT;
////CONNECTING TO MY DATABASE
const PORT: any = 8000;
mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log("welcome");

      app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    });
  })

  .catch((error: Error) => {
    console.error(error.message);
  });
mongoose.Promise = global.Promise;
