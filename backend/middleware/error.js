const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);

  if (err.code === 1100) {
    const message = `duplicate filed value error`;
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = `duplicate filed value error`;
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
