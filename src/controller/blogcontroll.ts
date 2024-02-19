import { Request, Response } from "express";
import Blog, { Iblog } from "../models/blog";
import { Validateblogtopost } from "../validation/validation";
import uploads from "../cloudinary/multer";
import { Cloudinaryuploads } from "../cloudinary/cloudinary";

export const Postblog = async (req: Request, res: Response) => {
  try {
    const blogscheker = Validateblogtopost(req.body);
    console.log(req.body.key);

    if (blogscheker.error) {
      return res.status(400).send(blogscheker.error.message);
    }

    uploads.single("image")(req, res, async (err: any) => {
      if (err) {
        res.status(400).send({ error: "Error uploading the file" });
        return;
      }

      try {
        const folder = "blog-images";
        if (req.file) {
          const result = (await Cloudinaryuploads(req.file.path, folder)) as {
            url: string;
            id: string;
          };

          const blog = new Blog({
            title: req.body.title,
            like: req.body.like,
            template: req.body.template,
            small_description: req.body.small_description,
            image_src: result.url,
          });
          await blog.save();
          return res.status(201).send(blog);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error saving the blog post" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
// export const Postblog = async (req: Request, res: Response) => {
//   try {
//     const blogscheker = Validateblogtopost(req.body);

//     if (blogscheker.error) {
//       return res.status(400).send(blogscheker.error.message);
//     }

//     // uploads.single("image")(req, res, async (err: any) => {
//     //   if (err) {
//     //     res.status(400).send({ error: "error Uploading the file" });
//     //     return;
//     //   }

//     //   if (req.file) {
//     //     const folder = "blog-images";
//     //     const result = (await Cloudinaryuploads(req.file.path, folder)) as {
//     //       url: string;
//     //       id: string;
//     //     };
//     const blog = new Blog({
//       title: req.body.title,
//       like: req.body.like,
//       template: req.body.template,
//       small_description: req.body.small_description,
//       // image_src: result.url,
//     });
//     await blog.save();
//     return res.status(201).send(blog);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error: "Internal server error" });
//   }
// };

export const Getallblogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  // console.log(blogs);
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
