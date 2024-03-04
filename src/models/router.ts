import express, { Router } from "express";

import {
  Createmessage,
  Replymessage,
  Getallmessage,
} from "../controller/Querries";

import {
  Postblog,
  GetSingleblog,
  Getallblogs,
  Deleteblogs,
  Updateblog,
} from "../controller/blogcontroll";
import {
  Deletcomments,
  UpdateComment,
  Postcomments,
  Getallcomments,
  Singlecomments,
  Getcommentstoblog,
} from "../controller/comments";
const router: Router = express.Router();
import { Isblogexist, Messagereply } from "../middleware/middle";
import {
  GetLikestoblog,
  GetallLikes,
  Putlikes,
  RemoveLike,
} from "../controller/like";
import passport from "passport";
import LocalStrategy from "passport-local";
import passportJwt from "passport-jwt";
import Users from "./users";
import jwt from "jsonwebtoken";
import { Login, Profile, Register } from "../controller/accountcontroller";
import { AdminCheck } from "../middleware/admin";
import image from "../cloudinary/multer";

//////////////////////////

///////////////////////////////
////GET ALL POST AND POST NEW ALL USE SAME ROUTE

router
  .route("/blogs")
  .post(
    passport.authenticate("jwt", { session: false }),
    AdminCheck,
    // SameblogCher,
    Postblog
  )
  .get(Getallblogs);

///////update INDIVIDUAL POST and remove ALL BASED ON ID

router
  .route("/blog/:id")
  .patch(
    passport.authenticate("jwt", { session: false }),
    AdminCheck,
    Updateblog
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    AdminCheck,
    Deleteblogs
  )
  .get(GetSingleblog);

/////✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅coomments section✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
router.route("/blog/:id/comments").post(Isblogexist, Postcomments);
router.route("/blog/:id/comments").get(Isblogexist, Getcommentstoblog);
router.route("/comments").get(Getallcomments);
router.route("/comments/:id").get(Singlecomments);
router.route("/comments/:id").patch(UpdateComment);
router.route("/comments/:id").delete(Deletcomments);

////✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
///CONTROLL MY MESSAGES
router
  .route("/message")
  .post(Createmessage)
  .get(passport.authenticate("jwt", { session: false }), Getallmessage);
router
  .route("/message/:id/reply")
  .patch(
    Messagereply,
    passport.authenticate("jwt", { session: false }),
    AdminCheck,
    Replymessage
  );
///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
///CONTROL THE LIKES
router.route("/blog/:id/likes").post(Isblogexist, Putlikes);
router.route("/blog/:id/likes").get(GetLikestoblog);
router.route("/likes").get(GetallLikes);
router.route("/likes/:id").delete(RemoveLike);

////// CONTROLL FOR NEW USER
router
  .route("/register")
  .post(passport.authenticate("signup", { session: false }), Register);
router
  .route("/login")
  .post(passport.authenticate("login", { session: false }), Login);
router
  .route("/profile")
  .get(passport.authenticate("jwt", { session: false }), Profile);
export default router;
