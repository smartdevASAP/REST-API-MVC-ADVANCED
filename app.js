const express = require("express");
const app = express();
const movieRouter = require("./routes/movieRoutes");
const authRouter = require("./routes/authRouter");
//ADDING A MIDDLEWARE;
app.use(express.json());

app.use("/home/movies", movieRouter);
app.use("/home/users", authRouter);
//creating a server

module.exports = app;
