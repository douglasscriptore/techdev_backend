"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Level = _interopRequireDefault(require("../entities/Level"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LevelsRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_Level.default);
  }

  async findAll({
    filter = '',
    take = 10,
    skip = 0
  }) {
    const [data, total] = await this.ormRepository.findAndCount({
      where: {
        levelname: (0, _typeorm.Like)(`%${filter.toLocaleLowerCase()}%`)
      },
      take,
      skip
    });
    return {
      data,
      count: total
    };
  }

  async findById(id) {
    return await this.ormRepository.findOne({
      id
    });
  }

  async create(levelData) {
    const level = this.ormRepository.create({ ...levelData,
      levelname: levelData.levelname.toLocaleLowerCase()
    });
    await this.ormRepository.save(level);
    return level;
  }

  async save(level) {
    return await this.ormRepository.save(level);
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

}

var _default = LevelsRepository;
exports.default = _default;