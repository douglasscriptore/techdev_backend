"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ILevelsRepository = _interopRequireDefault(require("../../levels/repositories/ILevelsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IDevelopersRepository = _interopRequireDefault(require("../repositories/IDevelopersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateDeveloperService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DevelopersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('LevelsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IDevelopersRepository.default === "undefined" ? Object : _IDevelopersRepository.default, typeof _ILevelsRepository.default === "undefined" ? Object : _ILevelsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateDeveloperService {
  constructor(developersRepository, levelsRepository) {
    this.developersRepository = developersRepository;
    this.levelsRepository = levelsRepository;
  }

  async execute({
    fullname,
    age,
    dateofborn,
    gender,
    level_id
  }) {
    // check if level_id exists
    const level = await this.levelsRepository.findById(level_id);

    if (!level) {
      throw new _AppError.default('Não é possivel cadastrar esse desenvolvedor pois o nível não existe');
    }

    const developer = await this.developersRepository.create({
      fullname,
      age,
      dateofborn,
      gender,
      level_id
    });
    return developer;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateDeveloperService;
exports.default = _default;