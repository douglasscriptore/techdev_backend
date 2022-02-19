"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ILevelsRepository = _interopRequireDefault(require("../repositories/ILevelsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateLevelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LevelsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ILevelsRepository.default === "undefined" ? Object : _ILevelsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateLevelService {
  constructor(levelsRepository) {
    this.levelsRepository = levelsRepository;
  }

  async execute({
    levelname
  }) {
    const level = await this.levelsRepository.create({
      levelname
    });
    return level;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateLevelService;
exports.default = _default;