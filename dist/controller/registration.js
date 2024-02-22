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
exports.Loginuser = exports.RegisterControllar = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../jwt/jwt");
const RegisterControllar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ///get user name and password
    try {
        const { username, password } = req.body;
        const user = yield users_1.default.findOne({ username: username });
        if (user) {
            return res
                .status(201)
                .json("the user name is arleady taken use other user name");
        }
        else {
            bcrypt_1.default
                .hash(password, 10)
                .then((hash) => __awaiter(void 0, void 0, void 0, function* () {
                const user = new users_1.default({
                    username: username,
                    password: hash,
                });
                yield user.save();
                return res.status(201).json("user created successfull");
            }))
                .catch((err) => {
                res.status(400).json(err.message);
            });
        }
    }
    catch (err) {
        res.status(400).json(err.message);
    }
});
exports.RegisterControllar = RegisterControllar;
const Loginuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield users_1.default.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ error: "user doesn't exist" });
        }
        const dbpasssword = user.password;
        bcrypt_1.default.compare(password, dbpasssword).then((match) => {
            if (!match) {
                return res.status(400).json({ error: "Wrong user name and Password" });
            }
            else {
                const accessToken = (0, jwt_1.Tokencreate)(user);
                res.cookie("access-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 10 * 1000,
                    httpOnly: true,
                });
                res.json("loged in");
            }
        });
    }
    catch (err) {
        res.status(400).json(err.message);
    }
});
exports.Loginuser = Loginuser;
