import request from "supertest";
import app from "../src/app";
import supertest from "supertest";
import Likes from "../src/models/likes";
import passport from "passport";

///// having simple function for testing

import mongoose from "mongoose";
import Comments from "../src/models/comment";

mongoose.Promise = global.Promise;
const mongo = process.env.MONGO_DB_CONNECT;

// Assume your MongoDB connection URI for the online server
const MONGO_URI: any = mongo;

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});
///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
let fisrt_blog: any;
describe("grouping testing", () => {
  it("/app/* testing 404", async () => {
    const response = await supertest(app).get("/api/");
    expect(response.statusCode).toBe(404);
  });

  // getting all broges
  it("getting all the blogs", async () => {
    const response = await supertest(app).get("/api/blogs");
    fisrt_blog = response.body.Blogs[0]._id;
    console.log(fisrt_blog);
    expect(response.status).toBe(200);
  });

  it("getting single blog with ", async () => {
    const res = await supertest(app).get(`/api/blog/${fisrt_blog}`);
    expect(res.status).toBe(200);
  });
});
///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
describe("checking for the likes", () => {
  it("should add likes to a blog", async () => {
    // Send a request to the Putlikes endpoint
    const response = await supertest(app)
      .post(`/api/blog/${fisrt_blog}/likes`)
      .send({ like: true });

    // Assertions
    expect(response.status).toBe(201); // Expect a 201 status code for successful creation
  });

  /////
  it("all like of  single a blog", async () => {
    const likeValue = true;

    // Send a request to the Putlikes endpoint
    const response = await supertest(app).get(`/api/blog/${fisrt_blog}/likes`);

    // Assertions
    expect(response.status).toBe(200); // Expect a 201 status code for successful creation
  });

  //// GETING ALL LIKE
  let LIKEId: any;
  it("ALL LIKES", async () => {
    const response = await supertest(app).get(`/api/likes`);
    expect(response.status).toBe(200);
    LIKEId = response.body.Likes[0]._id;
  });

  /////DELETE SINGLE LIKE
  it("delete the like", async () => {
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

///✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
let token: string;
describe("blogchecking and also login", () => {
  it("register", async () => {
    const response = await supertest(app).post("/api/register").send({
      email: "kalisat@gmail.com",
      password: "sdndklsns",
    });
    expect(response.statusCode).toBe(500);
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
    console.log(token);
    // console.log(response.body.token);
  });

  it("profile login", async () => {
    const response = await supertest(app)
      .post("/api/profile")
      .set("authorization", `Bearer ${token}`);

    // expect(response.statusCode).toBe(200);
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
        small_description: "donts make people smille",
      })
      .set("authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
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
    expect(response.status).toBe(200);
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
