import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import router from "./models/router";
import "./jwt/authe";

const app = express();
app.use(cors());
app.use(express.json());
passport.initialize();
app.use("/api", router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", passport.authenticate("jwt", { session: false }), router);
app.use(function (err: any, req: any, res: any, next: any) {
  res.status(err.status || 500);
  res.json({ error: err });
});

export default app;
