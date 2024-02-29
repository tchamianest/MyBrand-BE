import request from "supertest";
import app from "../src/app";
import supertest from "supertest";

///// having simple function for testing

import mongoose from "mongoose";
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

describe("grouping testing", () => {
  it("/app/* testing 404", async () => {
    const response = await supertest(app).get("/api/");
    expect(response.statusCode).toBe(404);
  });

  ////getting all broges
  it("getting all the blogs", async () => {
    const response = await supertest(app).get("/api/blogs");
    expect(response.statusCode).toBe(200);
  });
});
