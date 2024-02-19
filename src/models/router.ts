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
import { Loginuser, RegisterControllar } from "../controller/registration";
import { Validatetoken } from "../jwt/jwt";

//// import all the controller function
// const blogcontroll = require("./../controller/blogcontroll");

////GET ALL POST AND POST NEW ALL USE SAME ROUTE

router.route("/blogs").post(Postblog).get(Getallblogs);

///////update INDIVIDUAL POST and remove ALL BASED ON ID

router
  .route("/blog/:id")
  .patch(Updateblog)
  .delete(Deleteblogs)
  .get(GetSingleblog);

/////✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅coomments section✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
router
  .route("/blog/:id/comments")
  .post(Isblogexist, Validatetoken, Postcomments);
router.route("/blog/:id/comments").get(Isblogexist, Getcommentstoblog);
router.route("/comments").get(Getallcomments);
router.route("/comments/:id").get(Singlecomments);
router.route("/comments/:id").patch(UpdateComment);
router.route("/comments/:id").delete(Deletcomments);

////✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
///CONTROLL MY MESSAGES
router
  .route("/message")
  .post(Validatetoken, Createmessage)
  .get(Validatetoken, Getallmessage);
router.route("/message/:id/reply").patch(Messagereply, Replymessage);
///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
///CONTROL THE LIKES
router.route("/blog/:id/likes").post(Isblogexist, Putlikes);
router.route("/blog/:id/likes").get(Isblogexist, GetLikestoblog);
router.route("/likes").get(GetallLikes);
router.route("/likes/:id").delete(RemoveLike);

////// CONTROLL FOR NEW USER
router.route("/register").post(RegisterControllar);
router.route("/login").post(Loginuser);
export default router;
