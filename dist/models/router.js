"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Querries_1 = require("../controller/Querries");
const blogcontroll_1 = require("../controller/blogcontroll");
const comments_1 = require("../controller/comments");
const router = express_1.default.Router();
const middle_1 = require("../middleware/middle");
const like_1 = require("../controller/like");
const registration_1 = require("../controller/registration");
const jwt_1 = require("../jwt/jwt");
//// import all the controller function
// const blogcontroll = require("./../controller/blogcontroll");
////GET ALL POST AND POST NEW ALL USE SAME ROUTE
router.route("/blogs").post(blogcontroll_1.Postblog).get(blogcontroll_1.Getallblogs);
///////update INDIVIDUAL POST and remove ALL BASED ON ID
router
    .route("/blog/:id")
    .patch(blogcontroll_1.Updateblog)
    .delete(blogcontroll_1.Deleteblogs)
    .get(blogcontroll_1.GetSingleblog);
/////✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅coomments section✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
router
    .route("/blog/:id/comments")
    .post(middle_1.Isblogexist, jwt_1.Validatetoken, comments_1.Postcomments);
router.route("/blog/:id/comments").get(middle_1.Isblogexist, comments_1.Getcommentstoblog);
router.route("/comments").get(comments_1.Getallcomments);
router.route("/comments/:id").get(comments_1.Singlecomments);
router.route("/comments/:id").patch(comments_1.UpdateComment);
router.route("/comments/:id").delete(comments_1.Deletcomments);
////✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
///CONTROLL MY MESSAGES
router
    .route("/message")
    .post(jwt_1.Validatetoken, Querries_1.Createmessage)
    .get(jwt_1.Validatetoken, Querries_1.Getallmessage);
router.route("/message/:id/reply").patch(middle_1.Messagereply, Querries_1.Replymessage);
///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
///CONTROL THE LIKES
router.route("/blog/:id/likes").post(middle_1.Isblogexist, like_1.Putlikes);
router.route("/blog/:id/likes").get(middle_1.Isblogexist, like_1.GetLikestoblog);
router.route("/likes").get(like_1.GetallLikes);
router.route("/likes/:id").delete(like_1.RemoveLike);
////// CONTROLL FOR NEW USER
router.route("/register").post(registration_1.RegisterControllar);
router.route("/login").post(registration_1.Loginuser);
exports.default = router;
