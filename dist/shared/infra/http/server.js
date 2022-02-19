"use strict";

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("express-async-errors");

var _celebrate = require("celebrate");

var _routes = _interopRequireDefault(require("./routes"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

require("../typeorm");

require("../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
/**
 * Enable Cors Policy
 */

app.use((0, _cors.default)());
/**
 * Allowed express to use json
 */

app.use(_express.default.json());
/**
 * Intance of routes
 */

app.use(_routes.default);
/**
 * Init celebrate validation
 */

app.use((0, _celebrate.errors)());
/**
 * Format callback erros
 */

app.use((err, request, response, _) => {
  // Print errors on console when code start in development mode
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});
app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3333} in ${process.env.NODE_ENV} mode`);
});