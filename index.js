const fs = require("fs");
const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());
const server = http.createServer((req, res) => {
  console.log("welcome to the fiirst serve");
  res.end("welcome");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening to requests on port 3000");
});
