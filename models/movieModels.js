const mongoose = require("mongoose");
const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: [true, "name should be unique"],
  },
  description: {
    type: String,
  },
  release_year: {
    type: Number,
  },
  genre: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

const movieModel = mongoose.model("movieModel", moviesSchema);
module.exports = movieModel;
