"use strict";

var _Developer = require("../../infra/typeorm/entities/Developer");

var _FakeDevelopersRepository = _interopRequireDefault(require("../../repositories/fakes/FakeDevelopersRepository"));

var _FakeLevelsRepository = _interopRequireDefault(require("../../../levels/repositories/fakes/FakeLevelsRepository"));

var _CreateDeveloperService = _interopRequireDefault(require("../CreateDeveloperService"));

var _ListDevelopersService = _interopRequireDefault(require("../ListDevelopersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ListDevelopersService', () => {
  let fakeDevelopersRepository;
  let fakeLevelsRepository;
  let createDeveloperService;
  let listDevelopersService;
  beforeEach(() => {
    fakeDevelopersRepository = new _FakeDevelopersRepository.default();
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    createDeveloperService = new _CreateDeveloperService.default(fakeDevelopersRepository, fakeLevelsRepository);
    listDevelopersService = new _ListDevelopersService.default(fakeDevelopersRepository);
  });
  it('should be able to list all developers', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const developer = await createDeveloperService.execute({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Bento Scriptore',
      gender: _Developer.EnumGender.Male,
      level_id: level.id
    });
    const developers = await listDevelopersService.execute({});
    expect(developers).toEqual({
      data: [developer],
      count: 1
    });
  });
  it('should be able to list developers with filter', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const developer = await createDeveloperService.execute({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Bento Scriptore',
      gender: _Developer.EnumGender.Male,
      level_id: level.id
    });
    const developers = await listDevelopersService.execute({
      name: 'Dou'
    });
    expect(developers).toEqual({
      data: [developer],
      count: 1
    });
  });
});