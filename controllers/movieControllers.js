const movie = require("../models/movieModels");
exports.getMovies = async (req, res) => {
  try {
    const movies = await movie.find(req.query);
    res.status(200).json({
      status: "success",
      length: movies.length,
      data: {
        movies: movies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.postMovies = async (req, res) => {
  try {
    const sampleMovie = await movie.create(req.body);
    // console.log(sampleMovie);
    res.status(200).json({
      status: "success",
      data: {
        movie: sampleMovie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
//FINDING MOVIE BY ID;
exports.getMovie = async (req, res) => {
  try {
    const singleMovie = await movie.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        movie: singleMovie,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.updateMovies = async (req, res) => {
  try {
    const movieToUpdate = await movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteMovies = async (request, response) => {
  try {
    await movie.findByIdAndDelete(request.params.id);
    response.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    response.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
