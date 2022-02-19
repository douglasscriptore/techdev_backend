"use strict";

var _tsyringe = require("tsyringe");

var _LevelsRepository = _interopRequireDefault(require("../../../modules/levels/infra/typeorm/repositories/LevelsRepository"));

var _DevelopersRepository = _interopRequireDefault(require("../../../modules/developers/infra/typeorm/repositories/DevelopersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('LevelsRepository', _LevelsRepository.default);

_tsyringe.container.registerSingleton('DevelopersRepository', _DevelopersRepository.default);