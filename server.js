const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app.js");

mongoose
  .connect(process.env.CONNECTION_STR)
  .then((conn_obj) => {
    console.log("database connection was succesful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(process.env.PORT, () => {
  console.log("server has started on port " + process.env.PORT);
});
