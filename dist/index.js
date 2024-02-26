"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("./jwt/authe");
const app_1 = __importDefault(require("./app"));
///BODY PARSER
////CONNECTING TO MY DATABASE
const PORT = 8000;
mongoose_1.default
    .connect("mongodb+srv://tchamianest:ZDKDJ5G7px4pdgbR@cluster0.9cr0mrz.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log("welcome");
    });
})
    .catch((error) => {
    console.error(error.message);
});
mongoose_1.default.Promise = global.Promise;
