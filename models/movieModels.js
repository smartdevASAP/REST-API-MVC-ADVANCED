const mongoose = require("mongoose");
//first argument is the schema of the object
//second argument is the object of options
const fs = require("fs");
const moviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // maxlength: [100, "movie name must not have more than 100 characters"],
      // minlength: [4, "movie name must have atleast 4 characters"],
      unique: [true, "name should be unique"],
    },
    description: {
      type: String,
    },
    release_year: {
      type: Number,
      validate: {
        validator: function (year) {
          return year < 2000 && year > 2099;
        },
        message: `the year {YEAR} is not within the bracket year`,
      },
    },
    genre: {
      type: String,
      // select: false,
    },
    duration: {
      type: Number,
      validate: {
        validator: function (value) {
          //RETURNS TRUE OR FASE DEPENDING ON THE CONDITIONS PASSED;
          return value >= 1 && value <= 10;
        },
        message: "duration {VALUE} should be above 1 and below 10",
      },
    },
    createdBy: {
      type: String,
    },
  },
  //ADDING A VIRTUAL PROPERTIES
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

moviesSchema.virtual("durationInHours").get(function () {
  return this.duration / 60;
});
//ADDING DOCUMENT MIDDLEWARE;
//runs when .sav() is called or .create();
moviesSchema.pre("save", function (next) {
  (this.createdBy = "kelvin"), next();
});

//post hook
//it does not have access to the this keyword
moviesSchema.post("save", function (doc, next) {
  const content = `Anew movie document with name ${doc.title} created by ${doc.createdBy}\n`;
  fs.writeFileSync("./Log/log.txt", content, { flag: "a" }, (err) => {
    console.log(err.message);
  });
  next();
});
const movieModel = mongoose.model("movieModel", moviesSchema);
module.exports = movieModel;
