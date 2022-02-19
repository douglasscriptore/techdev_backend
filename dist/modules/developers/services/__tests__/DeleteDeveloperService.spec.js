"use strict";

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _FakeLevelsRepository = _interopRequireDefault(require("../../../levels/repositories/fakes/FakeLevelsRepository"));

var _FakeDevelopersRepository = _interopRequireDefault(require("../../repositories/fakes/FakeDevelopersRepository"));

var _DeleteDeveloperService = _interopRequireDefault(require("../DeleteDeveloperService"));

var _Developer = require("../../infra/typeorm/entities/Developer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DeleteDeveloperService.spec', () => {
  let fakeLevelsRepository;
  let fakeDevelopersRepository;
  let deleteDeveloperService;
  beforeEach(() => {
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    fakeDevelopersRepository = new _FakeDevelopersRepository.default();
    deleteDeveloperService = new _DeleteDeveloperService.default(fakeDevelopersRepository);
  });
  it('should be able delete the level', async () => {
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
    const deletedDeveloper = await deleteDeveloperService.execute({
      id: developer.id
    });
    expect(deletedDeveloper).toEqual(undefined);
  });
  it('should not be able delete the level if id not existing', async () => {
    await expect(deleteDeveloperService.execute({
      id: 123
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});