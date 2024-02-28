import mongoose from "mongoose";

import "./jwt/authe";
import app from "./app";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { resolve } from "path";
import axios from "axios";

///BODY PARSER
const DB: any = process.env.MONGO_DB_CONNECT;
////CONNECTING TO MY DATABASE
const PORT: any = 8000;
const swaggerDocumentUrl = "https://mybrand-be-7tft.onrender.com/swagger.json";
mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log("welcome");
      axios
        .get(swaggerDocumentUrl)
        .then((response) => {
          const options = {
            definition: response.data,
            apis: [],
          };

          // Use Swagger UI middleware
          app.use("/swagger", swaggerUi.serve, swaggerUi.setup(options));
        })
        .catch((error) => {
          console.error("Failed to fetch Swagger JSON:", error);
        });
    });
  })

  .catch((error: Error) => {
    console.error(error.message);
  });
mongoose.Promise = global.Promise;
