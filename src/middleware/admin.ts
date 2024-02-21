import passport, { use } from "passport";
import Users from "../models/users";
import { Request, Response, NextFunction } from "express";

export const AdminCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.user);
    const checkUser: any = req.user;
    if (checkUser) {
      const user: any = await Users.findOne({ _id: checkUser._id });
      if (user && user.type === "Admin") {
        next();
      } else {
        return res
          .status(404)
          .send({ error: "this is only possible to the admin" });
      }
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};
