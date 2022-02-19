"use strict";

var _FakeDevelopersRepository = _interopRequireDefault(require("../../repositories/fakes/FakeDevelopersRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _FakeLevelsRepository = _interopRequireDefault(require("../../../levels/repositories/fakes/FakeLevelsRepository"));

var _UpdateDevelopersService = _interopRequireDefault(require("../UpdateDevelopersService"));

var _Developer = require("../../infra/typeorm/entities/Developer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UpdateDeveloperService', () => {
  let fakeLevelsRepository;
  let fakeDevelopersRepository;
  let updateDeveloperService;
  beforeEach(() => {
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    fakeDevelopersRepository = new _FakeDevelopersRepository.default();
    updateDeveloperService = new _UpdateDevelopersService.default(fakeDevelopersRepository, fakeLevelsRepository);
  });
  it('should be able to update developer', async () => {
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
    const updatedDeveloper = await updateDeveloperService.execute({
      id: developer.id,
      fullname: 'douglas bento'
    });
    expect(updatedDeveloper.fullname).toEqual('douglas bento');
  });
  it('should be able to update non existing developer', async () => {
    await expect(updateDeveloperService.execute({
      id: 123,
      fullname: 'Douglas Bento Scriptore'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update non existing level', async () => {
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
    await expect(updateDeveloperService.execute({
      id: developer.id,
      level_id: 123,
      fullname: 'Douglas Bento Scriptore'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});