"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Profile = exports.Register = exports.Login = void 0;
const Jwt = __importStar(require("jwt-simple"));
const passport_1 = __importDefault(require("passport"));
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("login", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error("An error occurred.");
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.email };
                const token = Jwt.encode({ user: body }, "TOP_SECRET");
                return res.json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
});
exports.Login = Login;
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "Signup successful",
        user: req.user,
    });
    next();
});
exports.Register = Register;
const Profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
    });
});
exports.Profile = Profile;
