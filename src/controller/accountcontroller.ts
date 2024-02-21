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
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = Jwt.encode({ user: body }, "TOP_SECRET");

        return res.json({ token });
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
  res.json({
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
  console.log(req.user);
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
};
