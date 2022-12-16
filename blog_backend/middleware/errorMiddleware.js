const errorHandler = (err, req, res, next) => {
  // İf there is no status code set it to 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  // send a object ass error and stack
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
module.exports = {
  errorHandler,
};
