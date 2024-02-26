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
          return res.status(400).json({
            status: "Fail",
            messgae: "check your input data",
            AT: blogChecker.error.message,
          });
        }
        if (err) {
          return res
            .status(400)
            .json({ status: "Fail", error: "Error uploading the file" });
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

        return res.status(201).json({
          status: "success!",
          message: "blog created succeful",
          blogs: blog,
        });
      } catch (error) {
        // console.log(error);
        return res.status(500).json({
          status: "Fail",
          message: "some error happen ",
          errors: error,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Fail", message: "some error happen", error: error });
  }
};

export const Getallblogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success",
      counntingAll: blogs.length,
      message: "getting all blog successful",
      Blogs: blogs,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: "getting all blog Fail",
      Error: err,
    });
  }
};

//// get singleblogs
export const GetSingleblog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findOne({ _id: req.params.id }).populate(
      "comments"
    );

    if (!blogs) {
      return res
        .status(404)
        .json({ status: "fail", error: "error the blog not exist" });
    }

    res.status(200).json({
      status: "success",
      message: "isok we get single blog",
      blogs: blogs,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: "there is an error  in geting single blog",
      error: err,
    });
  }
};

/////DELETE BLOGS
export const Deleteblogs = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .json({ status: "success", message: "blog deleted succesufl" });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: "the blog are not deleted there is error happrn",
      error: err,
    });
  }
};
/////UPDATE SINGLE BLOGS
export const Updateblog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findOne({ _id: req.params.id });

    if (!blogs) {
      res.status(404).json({ status: "fail", error: "blog doesn't exist!" });
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
    res.status(200).json({
      status: "success!",
      message: "blog updated succeful",
      Blog: blogs,
    });
  } catch (err) {
    res.status(404);
    res.json({
      status: "Fail",
      message: "the blog are not updated",
      error: err,
    });
  }
};

// export { postblog, getallblogs, getSingleblog, Deleteblogs, Updateblog };
