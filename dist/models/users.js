"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Userschema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "User",
    },
});
const Users = mongoose_1.default.model("Users", Userschema);
// Userschema.pre("save", async (next) => {
//   const users: any = this;
//   const hash = await bcrypt.hash(users.password, 10);
//   users.password = hash;
//   next();
// });
// Userschema.methods.isValidPassword = async function (password: any) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// };
exports.default = Users;
