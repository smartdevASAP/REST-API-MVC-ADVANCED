const express = require("express");
var router = express.Router();
const controllers = require("./../controllers/movieControllers");

router.route("/").get(controllers.getMovies).post(controllers.postMovies);

router
  .route("/:id")
  .get(controllers.getMovie)
  .delete(controllers.deleteMovies)
  .patch(controllers.updateMovies);
module.exports = router;
