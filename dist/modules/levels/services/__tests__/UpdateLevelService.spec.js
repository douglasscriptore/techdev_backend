"use strict";

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _FakeLevelsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLevelsRepository"));

var _UpdateLevelService = _interopRequireDefault(require("../UpdateLevelService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UpdateLevelService', () => {
  let fakeLevelsRepository;
  let updateLevelService;
  beforeEach(() => {
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    updateLevelService = new _UpdateLevelService.default(fakeLevelsRepository);
  });
  it('should be able to update level', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const updatedLevel = await updateLevelService.execute({
      id: level.id,
      levelname: 'Junior Software Enginer'
    });
    expect(updatedLevel.levelname).toEqual('Junior Software Enginer');
  });
  it('should be able to update non existing level', async () => {
    await expect(updateLevelService.execute({
      id: 123,
      levelname: 'Frontend Developer'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});