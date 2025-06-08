const user = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};
exports.signUp = async (req, res, next) => {
  try {
    const newUser = await user.create(req.body);

    //JWT CONTAINS {3} PARTS 1)HEADER 2)PAYLOAD 3)SIGNATURE
    //signature contains header payload and secret string
    //example; var token=jwt.sign({foo:"bar"},shhh)
    //foo->payload
    //shh->secret string
    //The 3rd optional parameters will be added to the payload in the jwt
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
/********************* */
// LOGIN
//A USER WHO IS EXISTING IN THE DATABASE;
//post req with email and password
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    /********************/
    //400 BAD-REQ
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "please provide your email and password",
      });
    }
    /********************/
    //CHECKING WHETHER THE USER IS IN THE DATABASE;
    // const user = await user.findOne({ email: email });

    const _user = await user.findOne({ email: email }).select("+password");
    const isMatch = await _user.comparePasswordInDb(password, _user.password);

    //CHECK IF THE USER EXISTS & THE PASWORD MATCHES;
    if (!_user || !isMatch) {
      const error = "incorrect email or password";
      const statusCode = 400;
      return res.status(statusCode).json({
        status: "fail",
        message: error,
      });
    }

    /****************/
    const token = signToken(_user._id);

    res.status(200).json({
      status: "success",
      data: {
        token: token,
        // user: _user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
