import Users from "../models/users";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { Tokencreate } from "../jwt/jwt";
export const RegisterControllar = async (req: Request, res: Response) => {
  ///get user name and password
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });
    if (user) {
      return res
        .status(201)
        .json("the user name is arleady taken use other user name");
    } else {
      bcrypt
        .hash(password, 10)
        .then(async (hash) => {
          const user = new Users({
            username: username,
            password: hash,
          });
          await user.save();
          return res.status(201).json("user created successfull");
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
};

export const Loginuser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ error: "user doesn't exist" });
    }
    const dbpasssword = user.password;
    bcrypt.compare(password, dbpasssword).then((match) => {
      if (!match) {
        return res.status(400).json({ error: "Wrong user name and Password" });
      } else {
        const accessToken = Tokencreate(user);
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 10 * 1000,
          httpOnly: true,
        });
        res.json("loged in");
      }
    });
  } catch (err: any) {
    res.status(400).json(err.message);
  }
};
