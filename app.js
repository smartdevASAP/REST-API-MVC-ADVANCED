const express = require("express");
const app = express();
const movieRouter = require("./routes/movieRoutes");
const authRouter = require("./routes/authRouter");
const globalErrorHandler = require("./controllers/errorController");
const customError = require("./Utils/customError");
//ADDING A MIDDLEWARE;
app.use(express.json());

app.use("/home/movies", movieRouter);
app.use("/home/users", authRouter);
module.exports = app;
