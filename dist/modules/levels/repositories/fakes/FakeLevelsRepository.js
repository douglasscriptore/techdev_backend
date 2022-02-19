"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Level = _interopRequireDefault(require("../../infra/typeorm/entities/Level"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FakeLevelsRepository {
  constructor() {
    _defineProperty(this, "levels", []);
  }

  async findAll({
    filter = ''
  }) {
    const filteredLevels = this.levels.filter(le => le.levelname.includes(filter.toLocaleLowerCase()));
    return {
      data: filteredLevels,
      count: filteredLevels.length
    };
  }

  async findById(id) {
    const level = this.levels.find(level => level.id === id);
    return level;
  }

  async create(levelData) {
    const level = new _Level.default();
    Object.assign(level, {
      id: new Date().getTime()
    }, { ...levelData,
      levelname: levelData.levelname.toLocaleLowerCase()
    });
    this.levels.push(level);
    return level;
  }

  async save(level) {
    const findIndex = this.levels.findIndex(findLevel => findLevel.id === level.id);
    this.levels[findIndex] = level;
    return level;
  }

  async delete(id) {
    this.levels.filter(level => level.id !== id);
  }

}

var _default = FakeLevelsRepository;
exports.default = _default;