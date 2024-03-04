import Users, { UserD } from "../models/users";
import { NextFunction, Request, Response } from "express";
import { ConfiG } from "../jwt/config";
import * as Jwt from "jwt-simple";
import { use } from "passport";
import bcrypt from "bcrypt";
import passport from "passport";

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("login", async (err: any, user: any, info: any) => {
    try {
      if (err || !user) {
        const errormessage = info ? info.message : "an error occurred.";
        const error = new Error(errormessage);

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        // return res.status(500).json({ error: "good yaje " });
        const body = {
          _id: user._id,
          email: user.email,
          password: user.password,
          types: user.type,
        };
        const token = Jwt.encode({ user: body }, "TOP_SECRET");
        // console.log("kalisa dasa");
        //change the output
        return res.status(200).json({ token: token, type: user.type });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).json({
    message: "Signup successful",
    user: req.user,
  });
  next();
};

export const Profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.user);
  res.status(200).json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
  next();
};
