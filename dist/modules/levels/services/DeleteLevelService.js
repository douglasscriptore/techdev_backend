"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IDevelopersRepository = _interopRequireDefault(require("../../developers/repositories/IDevelopersRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ILevelsRepository = _interopRequireDefault(require("../repositories/ILevelsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteLevelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LevelsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DevelopersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ILevelsRepository.default === "undefined" ? Object : _ILevelsRepository.default, typeof _IDevelopersRepository.default === "undefined" ? Object : _IDevelopersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteLevelService {
  constructor(levelsRepository, developersRepository) {
    this.levelsRepository = levelsRepository;
    this.developersRepository = developersRepository;
  }

  async execute({
    id
  }) {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new _AppError.default('Nível nao localizado');
    }

    const developers = await this.developersRepository.findAll({
      level_ids: [level.id]
    });

    if (developers.data.length > 0) {
      throw new _AppError.default('Não é possível deletar esse nível, pois existem desenvolvedores associados');
    }

    await this.levelsRepository.delete(level.id);
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = DeleteLevelService;
exports.default = _default;