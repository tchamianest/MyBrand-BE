import mongoose from "mongoose";

export interface UserD {
  username: string;
  password: string;
}

const Userschema = new mongoose.Schema<UserD>({
  username: String,
  password: String,
});

const Users = mongoose.model<UserD>("Users", Userschema);

export default Users;
