"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogcontroll_1 = require("../controller/blogcontroll");
const router = express_1.default.Router();
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
////DELETE THE SINGLE BLOGS
// router.delete("/blog/:id", blogcontroll.Deleteblogs);
exports.default = router;
