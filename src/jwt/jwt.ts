import { sign, verify, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import * as dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.TOKENCREATERA as Secret | undefined;
export const Tokencreate = (user: any) => {
  if (!secretKey) {
    return new Error("Token secret is undefined");
  }
  const accessToken = sign(
    { username: user.username, id: user._id },
    "tchamianest@12345"
  );
  return accessToken;
};

interface AuthenticatedRequest extends Request {
  authenticated?: boolean;
}
export const Validatetoken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["access-token"];
  console.log(req.cookies["access-token"]);
  if (!accessToken) {
    return res.status(400).json({ error: "Please first login " });
  }
  try {
    const validtoken = verify(accessToken, "tchamianest@12345");
    if (validtoken) {
      req.authenticated = true;
      return next();
    }
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
