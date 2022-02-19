"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _developers = _interopRequireDefault(require("../../../../modules/developers/infra/http/routes/developers.routes"));

var _levels = _interopRequireDefault(require("../../../../modules/levels/infra/http/routes/levels.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Modules Router
 */
const routes = (0, _express.Router)();
routes.use('/developers', _developers.default);
routes.use('/levels', _levels.default);
routes.get('/health-check', (request, response) => {
  response.json({
    response: 'Server Online 🚀'
  });
});
var _default = routes;
exports.default = _default;