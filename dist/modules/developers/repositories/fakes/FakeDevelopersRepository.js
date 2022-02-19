"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Developer = _interopRequireDefault(require("../../infra/typeorm/entities/Developer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FakeDevelopersRepository {
  constructor() {
    _defineProperty(this, "developers", []);
  }

  async findAll({
    name = '',
    level_ids = []
  }) {
    const filteredDevelopers = this.developers.filter(dev => dev.fullname.includes(name.toLocaleLowerCase()));
    return {
      data: filteredDevelopers,
      count: filteredDevelopers.length
    };
  }

  async findById(id) {
    const developer = this.developers.find(developer => developer.id === id);
    return developer;
  }

  async create(developerData) {
    const developer = new _Developer.default();
    Object.assign(developer, {
      id: new Date().getTime()
    }, { ...developerData,
      fullname: developerData.fullname.toLocaleLowerCase()
    });
    this.developers.push(developer);
    return developer;
  }

  async save(developer) {
    const findIndex = this.developers.findIndex(findDev => findDev.id === developer.id);
    this.developers[findIndex] = developer;
    return developer;
  }

  async delete(id) {
    this.developers.filter(developer => developer.id !== id);
  }

}

var _default = FakeDevelopersRepository;
exports.default = _default;