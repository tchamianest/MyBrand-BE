import { Request, Response } from "express";
import Blog, { Iblog } from "../models/blog";
import { Validateblogtopost } from "../validation/validation";
// import uploads from "../cloudinary/multer";
import cloudinary from "../cloudinary/cloudinary";
import image from "../cloudinary/multer";

const upload = image;
export const Postblog = async (req: Request, res: Response) => {
  try {
    upload.single("image")(req, res, async (err: any) => {
      // console.log(req.body);
      // console.log(req.file);
      try {
        const blogChecker = Validateblogtopost(req.body);

        if (blogChecker.error) {
          return res.status(400).send(blogChecker.error.message);
        }
        if (err) {
          return res.status(400).send({ error: "Error uploading the file" });
        }

        if (!req.file) return res.status(404).send("no req file");
        console.log(req.file.path);
        const result = await cloudinary.uploader.upload(req.file.path);

        let imageUrl = "";
        imageUrl = result.url;
        // console.log(result);
        const blog = new Blog({
          title: req.body.title,
          like: req.body.like,
          template: req.body.template,
          small_description: req.body.small_description,
          image_src: imageUrl,
        });
        await blog.save();

        return res.status(201).send(blog);
      } catch (error) {
        // console.log(error);
        return res.status(500).send({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const Getallblogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find();

  res.send(blogs);
};

//// get singleblogs
export const GetSingleblog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findOne({ _id: req.params.id }).populate(
      "comments"
    );
    res.send(blogs);
  } catch {
    res.status(404);
    res.send({ error: "Post dosen't exist !" });
  }
};

/////DELETE BLOGS
export const Deleteblogs = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};
/////UPDATE SINGLE BLOGS
export const Updateblog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findOne({ _id: req.params.id });

    if (!blogs) {
      res.status(404).send({ error: "Post doesn't exist!" });
      return;
    }

    if (req.body.title) {
      blogs.title = req.body.title;
    }

    if (req.body.like) {
      blogs.like = req.body.like;
    }
    if (req.body.template) {
      blogs.template = req.body.template;
    }
    if (req.body.image_src) {
      blogs.image_src = req.body.image_src;
    }
    if (req.body.small_description) {
      blogs.small_description = req.body.small_description;
    }

    await blogs.save();
    res.send(blogs);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

// export { postblog, getallblogs, getSingleblog, Deleteblogs, Updateblog };
