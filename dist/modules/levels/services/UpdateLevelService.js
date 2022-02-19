"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ILevelsRepository = _interopRequireDefault(require("../repositories/ILevelsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateLevelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LevelsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ILevelsRepository.default === "undefined" ? Object : _ILevelsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateLevelService {
  constructor(levelsRepository) {
    this.levelsRepository = levelsRepository;
  }

  async execute({
    levelname,
    id
  }) {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new _AppError.default('Nível nao localizado');
    }

    level.levelname = levelname;
    await this.levelsRepository.save(level);
    return level;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateLevelService;
exports.default = _default;