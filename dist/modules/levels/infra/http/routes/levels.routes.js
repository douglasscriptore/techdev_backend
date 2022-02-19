"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _LevelsController = _interopRequireDefault(require("../controllers/LevelsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const levelsController = new _LevelsController.default();
const levelsRouter = (0, _express.Router)();
levelsRouter.get('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    filter: _celebrate.Joi.string(),
    take: _celebrate.Joi.number(),
    skip: _celebrate.Joi.number()
  }
}), levelsController.index);
levelsRouter.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.number()
  }
}), levelsController.show);
levelsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    levelname: _celebrate.Joi.string().required()
  }
}), levelsController.create);
levelsRouter.put('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.number()
  },
  [_celebrate.Segments.BODY]: {
    levelname: _celebrate.Joi.string().required()
  }
}), levelsController.update);
levelsRouter.delete('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.number()
  }
}), levelsController.destroy);
var _default = levelsRouter;
exports.default = _default;