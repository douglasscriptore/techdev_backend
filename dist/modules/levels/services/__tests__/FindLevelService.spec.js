"use strict";

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _FakeLevelsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLevelsRepository"));

var _FindLevelService = _interopRequireDefault(require("../FindLevelService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FindLevelService', () => {
  let fakeLevelsRepository;
  let findLevelService;
  beforeEach(() => {
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    findLevelService = new _FindLevelService.default(fakeLevelsRepository);
  });
  it('should be able show the level', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const findedLevel = await findLevelService.execute({
      id: level.id
    });
    expect(findedLevel.levelname).toBe('senior software enginer');
  });
  it('should not be able show the level if id not existing', async () => {
    await expect(findLevelService.execute({
      id: 123
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});