const logger = require("./logger");


// Centralized error handler middleware
function errorHandler(err, req, res, next) {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
