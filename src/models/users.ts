import mongoose from "mongoose";
import passportmon from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import bcrypt from "bcrypt";
import { string } from "joi";

export interface UserD {
  email: string;
  password: String;
  type: string;
  isValidPassword(password: string): Promise<boolean>;
}

const Userschema = new mongoose.Schema<UserD>({
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
const Users = mongoose.model<UserD>("Users", Userschema);

Userschema.pre("save", async (next) => {
  const users: any = this;
  const hash = await bcrypt.hash(users.password, 10);
  users.password = hash;
  next();
});

Userschema.methods.isValidPassword = async function (password: any) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export default Users;
