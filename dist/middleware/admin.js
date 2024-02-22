"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCheck = void 0;
const users_1 = __importDefault(require("../models/users"));
const AdminCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.user);
        const checkUser = req.user;
        if (checkUser) {
            const user = yield users_1.default.findOne({ _id: checkUser._id });
            if (user && user.type === "Admin") {
                next();
            }
            else {
                return res
                    .status(404)
                    .send({ error: "this is only possible to the admin" });
            }
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
exports.AdminCheck = AdminCheck;
