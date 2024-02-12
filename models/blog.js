const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  like: Number,
  template: String,
  image_src: String,
  small_description: String,
});

module.exports = mongoose.model("blog", schema);
