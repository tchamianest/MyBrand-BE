import request from "supertest";
import app from "../src/app";
import supertest from "supertest";
import Likes from "../src/models/likes";
import passport from "passport";

///// having simple function for testing

import mongoose from "mongoose";
import Comments from "../src/models/comment";

mongoose.Promise = global.Promise;

// Assume your MongoDB connection URI for the online server
const MONGO_URI =
  "mongodb+srv://tchamianest:ZDKDJ5G7px4pdgbR@cluster0.9cr0mrz.mongodb.net/?retryWrites=true&w=majority";

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});
///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
describe("grouping testing", () => {
  it("/app/* testing 404", async () => {
    const response = await supertest(app).get("/api/");
    expect(response.statusCode).toBe(404);
  });

  // getting all broges
  it("getting all the blogs", async () => {
    const response = await supertest(app).get("/api/blogs");
    console.log(response.status);
    expect(response.status).toBe(200);
  });

  it("getting single blog with ", async () => {
    const res = await supertest(app).get("/api/blog/65ca82b2d30bff9022f18d74");
    expect(res.status).toBe(200);
  });
});
///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
describe("checking for the likes", () => {
  it("should add likes to a blog", async () => {
    const blogId = "65ca82b2d30bff9022f18d74";
    const likeValue = true;

    // Send a request to the Putlikes endpoint
    const response = await supertest(app)
      .post(`/api/blog/${blogId}/likes`)
      .send({ blog_id: blogId, like: likeValue });

    // Assertions
    expect(response.status).toBe(201); // Expect a 201 status code for successful creation
    expect(response.body.blog_id).toBe(blogId);
    expect(response.body.like).toBe(likeValue);

    // Optionally, you can check if the like was actually added to the database
    const savedLike = await Likes.findOne({ blog_id: blogId });
    expect(savedLike).not.toBeNull();
    expect(savedLike?.like).toBe(likeValue);
  });

  /////
  it("all like of  single a blog", async () => {
    const blogId = "65ca82b2d30bff9022f18d74";
    const likeValue = true;

    // Send a request to the Putlikes endpoint
    const response = await supertest(app).get(`/api/blog/${blogId}/likes`);

    // Assertions
    expect(response.status).toBe(200); // Expect a 201 status code for successful creation
  });

  //// GETING ALL LIKE
  it("ALL LIKES", async () => {
    const response = await supertest(app).get(`/api/likes`);
    expect(response.status).toBe(200);
  });

  /////DELETE SINGLE LIKE
  it("delete the like", async () => {
    const LIKEId = "65d10a3419bd156e3630375d";

    const response = await supertest(app).delete(`/api/likes/${LIKEId}`);

    // Assertions
    expect(response.status).toBe(200);
  });

  it("getting alllikes", async () => {
    const response = await supertest(app).get(`/api/likes`);

    expect(response.statusCode).toBe(200);
    expect(() => {
      if (response.body.error) {
        throw new Error(response.body.error);
      }
    }).not.toThrow();
  });
});

////✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
///QUERIES CHECK

describe("CHECKING FOR THE QUERIES ", () => {
  it("send the queries", async () => {
    const res = await supertest(app).post("/register");
  });
  it("send the queries", async () => {
    const res = await supertest(app).post("/login");
  });
  it("send the queries", async () => {
    const res = await supertest(app).post("/profile");
  });
});

///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
let token: string;
describe("blogchecking and also login", () => {
  it("register", async () => {
    const response = await supertest(app).post("/api/register").send({
      email: "tchamiacsnest@gmail.com",
      password: "tchami1234csss",
    });
    expect(response.statusCode).toBe(201);
    // expect(response.body).toHaveProperty("token");
    // token = response.body.token;
    // console.log(response.body.token);
  });

  it("ckecking for login", async () => {
    const response = await supertest(app).post("/api/login").send({
      email: "tchamianest@gmail.com",
      password: "tchami1234",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
    // console.log(response.body.token);
  });

  it("profile login", async () => {
    const response = await supertest(app)
      .post("/api/profile")
      .set("authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it("update blos", async () => {
    const response = await supertest(app)
      .patch("/api/blog/65cbb3623c48313d743901cf")

      .send({
        title: "update blogs",
        like: 10,
        template: "hahas",
        comments: [],
        image_src: "req.body.String",
        small_description: "donts make people smille",
      })
      .set("authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it("create blog ", async () => {
    const response = await supertest(app)
      .post("/api/blogs")

      .send({
        title: "update blogs",
        like: 10,
        template: "hahas",
        comments: [],
        image_src: "req.body.String",
        small_description: "donts make people smille",
      })
      .set("authorization", `Bearer ${token}`);

    expect(response.body.message).toContain(
      "value must not be null nor undefined"
    );
  });

  it("check for profile", async () => {
    const response = await supertest(app)
      .get("/api/profile")
      .set("authorization", `Bearer ${token}`);

    console.log(response.body.message);
    expect(response.body.message).toContain("You made it to the secure route");
  });
});

describe("comments testing", () => {
  it("geting allcomments", async () => {
    const response = await supertest(app).get("/api/comments");
    expect(response.statusCode).toBe(200);
  });

  it("geting the single comments", async () => {
    const response = await supertest(app).get(
      "/api/comments/65ccb97852d64533d0cc0e3b"
    );

    expect(response.statusCode).toBe(200);
  });
  it("if no comments exist", async () => {
    const response = await supertest(app).patch("/api/comments/dadddaa");
    expect(response.statusCode).toBe(500);
  });
  it("updating the single comments", async () => {
    const response = await supertest(app)
      .patch("/api/comments/65ce20f6c696eae85d9d519b")
      .send({
        comment: "nihatal musore wange",
      })
      .set("authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it("getting allcomments", async () => {
    const response = await supertest(app).get("/api/comments");
    expect(response.statusCode).toBe(200);
  });

  it("Post comments", async () => {
    const response = await supertest(app)
      .post("/api/blog/65cbb3623c48313d743901cf/comments")
      .send({
        name: "kalisa daniel mafene",
        comment: "nihatal musore wange",
      });
    expect(response.status).toBe(201);
  });
});

describe("Querries", () => {
  it("getting all message", async () => {
    const response = await supertest(app)
      .get("/api/message")
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it("getting all message", async () => {
    const response = await supertest(app)
      .post("/api/message")
      .send({
        email: "Tchamianes@gmail.com",
        messages: "urahaze kavune umuheto",
      })
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("reply messsage", async () => {
    const response = await supertest(app)
      .patch("/api/message/65cf480f9afd988ca7ce2acc/reply")
      .send({
        reply: "urahaze kavune umuheto",
      })
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
