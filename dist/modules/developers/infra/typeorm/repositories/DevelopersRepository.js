"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Developer = _interopRequireDefault(require("../entities/Developer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DevelopersRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_Developer.default);
  }

  async findAll({
    name = '',
    level_ids = [],
    take = 10,
    skip = 0
  }) {
    const filter = level_ids.length > 0 && {
      level_id: (0, _typeorm.In)(level_ids)
    };
    const [data, total] = await this.ormRepository.findAndCount({
      where: {
        fullname: (0, _typeorm.Like)(`%${name.toLocaleLowerCase()}%`),
        ...filter
      },
      relations: ['level'],
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
    }, {
      relations: ['level']
    });
  }

  async create(developerData) {
    const developer = this.ormRepository.create({ ...developerData,
      fullname: developerData.fullname.toLocaleLowerCase()
    });
    await this.ormRepository.save(developer);
    return developer;
  }

  async save(developer) {
    return await this.ormRepository.save(developer);
  }

  async delete(id) {
    await this.ormRepository.delete(id);
  }

}

var _default = DevelopersRepository;
exports.default = _default;