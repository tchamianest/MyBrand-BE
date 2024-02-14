const express = require("express");

const blog = require("./../models/blog");
const Post = require("./../models/blog");
const router = express.Router();

exports.postblog = async (req, res) => {
  try {
    const blog = new Post({
      title: req.body.title,
      like: req.body.like,
      template: req.body.template,
      image_src: req.body.image_src,
      small_description: req.body.small_description,
    });
    await blog.save();
    res.send(blog);
  } catch (error) {
    console.log(error);
  }
};

exports.getallblogs = async (req, res) => {
  const blogs = await blog.find();
  res.send(blogs);
};

//// get singleblogs
exports.getSingleblog = async (req, res) => {
  try {
    const blogs = await blog.findOne({ _id: req.params.id });
    res.send(blogs);
  } catch {
    res.status(404);
    res.send({ error: "Post dosen't exist !" });
  }
};

/////DELETE BLOGS
exports.Deleteblogs = async (req, res) => {
  try {
    await blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};
/////UPDATE SINGLE BLOGS
exports.Updateblog = async (req, res) => {
  try {
    const blogs = await blog.findOne({ _id: req.params.id });

    if (req.body.title) {
      blogs.title = req.body.title;
    }

    if (req.body.content) {
      blogs.content = req.body.content;
    }

    await blogs.save();
    res.send(Post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

// export { postblog, getallblogs, getSingleblog, Deleteblogs, Updateblog };
