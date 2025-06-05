const mongoose = require("mongoose");
const validator = require("validator");
const { validate } = require("./movieModels");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please enter your email"],
    lowerCase: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    //CUSTOM VALIDATOR ONLY WORKS ON SAVE() & CREATE() FUNCTIONS AND NOT ON ANY OTHER FUNCTION;
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "password and confirm password does not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //ENCRYPT THE PASSWORD BEFORE SAVING IT TO THE DATABASE; asyn version
  //ENCRYPTING IS ALSO CALLED HASHING A PASSWORD;
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const user = mongoose.model("user", userSchema);
module.exports = user;
