const express = require("express");

const blog = require("./blog");
const Post = require("./blog");
const router = express.Router();

////GET ALL POST
router.get("/blog", async (req, res) => {
  const blogs = await blog.find();
  res.send(blogs);
});

////CREATE POST
router.post("/blogs", async (req, res) => {
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
});

///////GET INDIVIDUAL POST

router.get("blog/:id", async (req, res) => {
  try {
    const blogs = await blog.findOne({ _id: req.params.id });
    res.end(blogs);
  } catch {
    res.status(404);
    res.send({ error: "Post dosen't exist !" });
  }
});

///////update INDIVIDUAL POST

router.patch("/blog/:id", async (req, res) => {
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
});

////DELETE THE SINGLE BLOGS
router.delete("/blog/:id", async (req, res) => {
  try {
    await blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

module.exports = router;
