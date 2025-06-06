//GLOBAL ERROR HANDLING MIDDLEWARE;
//4 PARAMETERS ARE PASSED TO INSTRUCT TO BE A G.E.H MIDDLEWARE;
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
