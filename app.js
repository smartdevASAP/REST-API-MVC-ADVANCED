const express = require("express");
const app = express();
const movieRouter = require("./routes/movieRoutes");
const authRouter = require("./routes/authRouter");
const globalErrorHandler = require("./controllers/errorController");
const customError = require("./Utils/customError");
//ADDING A MIDDLEWARE;
app.use(express.json());

app.use("/home/movies", movieRouter);

//HANDLING URLS THAT DONT HAVE A ROUTE;
//DEFAULT ROUTE SHOULD ALWAYS COME LAST;
// Catch-All Route for Undefined URLs
app.use((req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // (err.status = "fail"), (err.statusCode = 404);
  const err = new customError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});
app.use(globalErrorHandler);
/********************/
//app.use("/home/users", authRouter);
//creating a server

module.exports = app;
