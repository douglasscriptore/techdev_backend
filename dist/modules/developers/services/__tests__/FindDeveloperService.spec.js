"use strict";

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _FakeLevelsRepository = _interopRequireDefault(require("../../../levels/repositories/fakes/FakeLevelsRepository"));

var _FakeDevelopersRepository = _interopRequireDefault(require("../../repositories/fakes/FakeDevelopersRepository"));

var _FindDeveloperService = _interopRequireDefault(require("../FindDeveloperService"));

var _Developer = require("../../infra/typeorm/entities/Developer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FindDeveloperService', () => {
  let fakeLevelsRepository;
  let fakeDevelopersRepository;
  let findDeveloperService;
  beforeEach(() => {
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    fakeDevelopersRepository = new _FakeDevelopersRepository.default();
    findDeveloperService = new _FindDeveloperService.default(fakeDevelopersRepository);
  });
  it('should be able show the developer', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const developer = await fakeDevelopersRepository.create({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Scriptore',
      gender: _Developer.EnumGender.Male,
      level_id: level.id
    });
    const findedDeveloper = await findDeveloperService.execute({
      id: developer.id
    });
    expect(findedDeveloper.fullname).toBe('douglas scriptore');
  });
  it('should not be able show the developer if id not existing', async () => {
    await expect(findDeveloperService.execute({
      id: 123
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});