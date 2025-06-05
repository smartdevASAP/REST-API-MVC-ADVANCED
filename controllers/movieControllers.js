const movie = require("../models/movieModels");
// const ApiFeatures = require("../Utils/ApiFeatures.js");

// exports.getLatestMovie = (req, res, next) => {
//   //release_year[gte]=2020
//   req.query = { release_year: { $gte: 2020 } };
//   next();
// };
// var getMovies = async (req, res) => {
//   try {
//     console.log("Query before Apifeatures:", movie.find());
//     console.log("QueryStr before Apifeatures:", req.query);
//     const features = new Apifeatures(movie.find(), req.query)
//       .sort()
//       .filter()
//       .limitFields()
//       .paginate();
//     let movies = await features.query;
//     //GET REQUEST TO FIND RESOURCE IN THE DB VIA THE REQ.QUERY
//     /************************************************************/
//     // const parsedQuery = qs.parse(req.query);
//     // let queryStr = JSON.stringify(parsedQuery);
//     // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
//     // let queryObj = JSON.parse(queryStr);
//     // console.log(queryObj);
//     // let query = movie.find(queryObj);
//     /************************************************************/

//     //SORTING THE RESULT
//     /************************************************************/
//     // if (req.query.sort) {
//     //   const sortBy = req.query.sort.split(",").join(" ");
//     //   query = query.sort(sortBy);
//     // }
//     /************************************************************/

//     /************************************************************/
//     //LIMITING FIELDS;
//     // if (req.query.fields) {
//     //   const fields = req.query.fields.split(",").join(" ");
//     //   // console.log(fields);
//     //   query = query.select(fields);
//     // }
//     /************************************************************/

//     /************************************************************/
//     //PAGINATION;
//     // console.log(req.query);
//     // const page = req.query.page * 1;
//     // const limit = req.query.limit * 1;
//     // //PAGE 1 : 1-10  PAGE 2 : 11-20;
//     // const skip = (page - 1) * limit;
//     // query = query.skip(skip).limit(limit);
//     // if (req.query.page) {
//     //   const movieCount = movie.countDocuments();
//     // }
//     // const movies = await query;
//     /************************************************************/

//     res.status(200).json({
//       status: "success",
//       length: movies.length,
//       data: {
//         movies: movies,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
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
      mesage: err.message,
    });
  }
};

exports.postMovies = async (req, res) => {
  try {
    const sampleMovie = await movie.create(req.body);
    // console.log(sampleMovie);
    res.status(201).json({
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
      //RUNS THA VALIDATORS THAT HAVE BEEN DECLARED IN THE SCHEMA;
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

exports.getMovieStats = async (req, res) => {
  try {
    const stats = await movie.aggregate([
      //SPECIFY DIFFERENT STAGES & DOC PASSES THROUGH THIS STAGES {MATCH AND GROUO}
      { $match: { duration: { $gte: 10 } } },
      {
        $group: {
          //GROUPING IS DONE ACCORDING TO WHAT IS PASSED IN THE ID
          _id: "$genre",
          avgTim: { $avg: "$duration" },
          timeTotal: { $sum: "$duration" },
          movieCount: { $sum: 1 },
          movies: { $push: "$title" },
        },
      },
      { $addFields: { genre: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { movieCount: 1 } },
    ]);
    console.log(stats.length);
    res.status(200).json({
      status: "success",
      count: stats.length,
      data: {
        movie: stats,
      },
    });
  } catch (err) {
    response.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
//NOT WORKING BECAUSE OF HOW I STATED MY SCHEMA;
exports.getMovieByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await movie.aggregate([{ $unwind: "$genre" }]);
    res.status(200).json({
      status: "success",
      count: movies.length,
      data: {
        movie: movies,
      },
    });
  } catch (err) {
    response.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
