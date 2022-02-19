"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IDevelopersRepository = _interopRequireDefault(require("../repositories/IDevelopersRepository"));

var _ILevelsRepository = _interopRequireDefault(require("../../levels/repositories/ILevelsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateDevelopersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DevelopersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('LevelsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IDevelopersRepository.default === "undefined" ? Object : _IDevelopersRepository.default, typeof _ILevelsRepository.default === "undefined" ? Object : _ILevelsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateDevelopersService {
  constructor(developersRepository, levelsRepository) {
    this.developersRepository = developersRepository;
    this.levelsRepository = levelsRepository;
  }

  async execute({
    id,
    age,
    dateofborn,
    fullname,
    gender,
    level_id
  }) {
    const developer = await this.developersRepository.findById(id);

    if (!developer) {
      throw new _AppError.default('Desenvolvedor não localizado');
    }

    if (level_id) {
      const level = await this.levelsRepository.findById(level_id);

      if (!level) {
        throw new _AppError.default('Nível não localizado');
      }
    }

    if (!!age) developer.age = age;
    if (!!dateofborn) developer.dateofborn = dateofborn;
    if (!!fullname) developer.fullname = fullname;
    if (!!gender) developer.gender = gender;
    if (!!level_id) developer.level_id = level_id;
    await this.developersRepository.save(developer);
    return developer;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateDevelopersService;
exports.default = _default;