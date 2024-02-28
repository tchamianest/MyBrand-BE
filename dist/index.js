"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("./jwt/authe");
const app_1 = __importDefault(require("./app"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const axios_1 = __importDefault(require("axios"));
///BODY PARSER
const DB = process.env.MONGO_DB_CONNECT;
////CONNECTING TO MY DATABASE
const PORT = 8000;
const swaggerDocumentUrl = "https://mybrand-be-7tft.onrender.com/swagger.json";
mongoose_1.default
    .connect(DB)
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log("welcome");
        axios_1.default
            .get(swaggerDocumentUrl)
            .then((response) => {
            const options = {
                definition: response.data,
                apis: [],
            };
            // Use Swagger UI middleware
            app_1.default.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(options));
        })
            .catch((error) => {
            console.error("Failed to fetch Swagger JSON:", error);
        });
    });
})
    .catch((error) => {
    console.error(error.message);
});
mongoose_1.default.Promise = global.Promise;
