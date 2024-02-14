import express, { Router } from "express";

import {
  Postblog,
  GetSingleblog,
  Getallblogs,
  Deleteblogs,
  Updateblog,
} from "../controller/blogcontroll";
const router: Router = express.Router();

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

////DELETE THE SINGLE BLOGS
// router.delete("/blog/:id", blogcontroll.Deleteblogs);

export default router;
