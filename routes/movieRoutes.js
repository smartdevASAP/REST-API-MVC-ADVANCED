const express = require("express");
var router = express.Router();
const controllers = require("./../controllers/movieControllers");
//REMEMBER TO RE-CREATE THE GETALL MOVIES ROUTE HADLER FUNCTION;
router.route("/").post(controllers.postMovies).get(controllers.getMovies);
router.route("/movie-stats").get(controllers.getMovieStats);
router
  .route("/:id")
  .get(controllers.getMovie)
  .delete(controllers.deleteMovies)
  .patch(controllers.updateMovies);
module.exports = router;
