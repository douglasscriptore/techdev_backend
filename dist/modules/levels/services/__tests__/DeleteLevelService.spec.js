"use strict";

var _FakeDevelopersRepository = _interopRequireDefault(require("../../../developers/repositories/fakes/FakeDevelopersRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _FakeLevelsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLevelsRepository"));

var _DeleteLevelService = _interopRequireDefault(require("../DeleteLevelService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DeleteLeveService', () => {
  let fakeLevelsRepository;
  let fakeDevelopersRepository;
  let deleteLevelService;
  beforeEach(() => {
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    fakeDevelopersRepository = new _FakeDevelopersRepository.default();
    deleteLevelService = new _DeleteLevelService.default(fakeLevelsRepository, fakeDevelopersRepository);
  });
  it('should be able delete the level', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const deletedLevel = await deleteLevelService.execute({
      id: level.id
    });
    expect(deletedLevel).toEqual(undefined);
  });
  it('should not be able delete the level if id not existing', async () => {
    await expect(deleteLevelService.execute({
      id: 123
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should no be able delete if levels have developers associate', async () => {
    // FAZER ESSE AQUI
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    await expect(deleteLevelService.execute({
      id: 123
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});