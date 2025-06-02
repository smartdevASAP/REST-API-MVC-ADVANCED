const express = require("express");
const app = express();
const movieRouter = require("./routes/movieRoutes");
//ADDING A MIDDLEWARE;
app.use(express.json());

app.use("/home", movieRouter);
//creating a server

module.exports = app;
