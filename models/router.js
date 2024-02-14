const express = require("express");

const blog = require("./blog");
const Post = require("./blog");
const router = express.Router();

//// import all the controller function
const blogcontroll = require("./../controller/blogcontroll");

////GET ALL POST AND POST NEW ALL USE SAME ROUTE

router
  .route("/blogs")
  .post(blogcontroll.postblog)
  .get(blogcontroll.getallblogs);

///////update INDIVIDUAL POST and remove ALL BASED ON ID

router
  .route("/blog/:id")
  .patch(blogcontroll.Updateblog)
  .delete(blogcontroll.Deleteblogs)
  .get(blogcontroll.getSingleblog);

////DELETE THE SINGLE BLOGS
// router.delete("/blog/:id", blogcontroll.Deleteblogs);

module.exports = router;
