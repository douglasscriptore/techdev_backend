"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _Developer = require("../../typeorm/entities/Developer");

var _DevelopersController = _interopRequireDefault(require("../controllers/DevelopersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const developersController = new _DevelopersController.default();
const developersRouter = (0, _express.Router)();
developersRouter.get('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    name: _celebrate.Joi.string(),
    level_ids: _celebrate.Joi.string(),
    take: _celebrate.Joi.number(),
    skip: _celebrate.Joi.number()
  }
}), developersController.index);
developersRouter.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.number()
  }
}), developersController.show);
developersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    fullname: _celebrate.Joi.string().required(),
    gender: _celebrate.Joi.string().valid(...Object.values(_Developer.EnumGender)).required(),
    dateofborn: _celebrate.Joi.date().required(),
    age: _celebrate.Joi.number().required(),
    level_id: _celebrate.Joi.number().required()
  }
}), developersController.create);
developersRouter.put('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.number()
  },
  [_celebrate.Segments.BODY]: {
    fullname: _celebrate.Joi.string(),
    gender: _celebrate.Joi.string().valid(...Object.values(_Developer.EnumGender)),
    dateofborn: _celebrate.Joi.date(),
    age: _celebrate.Joi.number(),
    level_id: _celebrate.Joi.number()
  }
}), developersController.update);
developersRouter.delete('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.number()
  }
}), developersController.destroy);
var _default = developersRouter;
exports.default = _default;