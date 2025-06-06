//CREATE A CUSTOM ERROR CLASS;
//MAKING THE CLASS INHERIT FROM THE Error class built in in JS
class customError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    //creating a property
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = customError;
//const customError=new customError();
