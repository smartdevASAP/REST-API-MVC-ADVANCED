const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
//name,email,password,confirm password,photo;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
  },
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLength: 8,
    // select: false, so that the users password will not best to the UI
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      //WORKS ONLY FOR save() and create();
      //RECIEVES THE VALUE IN THE CONFIRMPASSWORD;
      validator: function (val) {
        //CHECKS WHETHER THE CAONFIRMPASS &PASS ARE THE SAME &RETURNS A BOOLEAN VALUE;
        return val === this.password;
      },
      message: "password and confirm password doesnot match",
    },
  },
});
// ENCRYPTION LOGIC
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //ENCRYPTION USING BCRYPT;
  //it will salt the password first (adding random strings to ensure 2 similar paswords are not the same) then hash it;
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

//compare password in req.body and the password in the database; //CREATE AN INSTANCE METHOD ON USERSMODEL
//This is an instance
userSchema.methods.comparePasswordInDb = async function (pass, passDB) {
  return await bcrypt.compare(pass, passDB);
};
const user = mongoose.model("user", userSchema);

module.exports = user;
