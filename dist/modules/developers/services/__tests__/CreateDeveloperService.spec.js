"use strict";

var _Developer = require("../../infra/typeorm/entities/Developer");

var _FakeDevelopersRepository = _interopRequireDefault(require("../../repositories/fakes/FakeDevelopersRepository"));

var _FakeLevelsRepository = _interopRequireDefault(require("../../../levels/repositories/fakes/FakeLevelsRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateDeveloperService = _interopRequireDefault(require("../CreateDeveloperService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CreateDeveloperService', () => {
  let fakeDevelopersRepository;
  let fakeLevelsRepository;
  let createDeveloperService;
  beforeEach(() => {
    fakeDevelopersRepository = new _FakeDevelopersRepository.default();
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    createDeveloperService = new _CreateDeveloperService.default(fakeDevelopersRepository, fakeLevelsRepository);
  });
  it('should be able to create a new developer', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const developer = await createDeveloperService.execute({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Scriptore',
      gender: _Developer.EnumGender.Male,
      level_id: level.id
    });
    expect(developer).toHaveProperty('id');
  });
  it('should not be able to create developer with non existing level id', async () => {
    await expect(createDeveloperService.execute({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Scriptore',
      gender: _Developer.EnumGender.Male,
      level_id: 123
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});