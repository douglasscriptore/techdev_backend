"use strict";

var _FakeLevelsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLevelsRepository"));

var _ListLevelsService = _interopRequireDefault(require("../ListLevelsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ListLevelsService', () => {
  let fakeLevelsRepository;
  let listLevelsService;
  beforeEach(() => {
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    listLevelsService = new _ListLevelsService.default(fakeLevelsRepository);
  });
  it('should be able to list the levels', async () => {
    const level1 = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const level2 = await fakeLevelsRepository.create({
      levelname: 'Junior Developer'
    });
    const levels = await listLevelsService.execute({});
    expect(levels).toEqual({
      data: [level1, level2],
      count: 2
    });
  });
  it('should be able to list with filter', async () => {
    const level1 = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer'
    });
    const level2 = await fakeLevelsRepository.create({
      levelname: 'Junior Developer'
    });
    const levels = await listLevelsService.execute({
      filter: 'unIor'
    });
    expect(levels).toEqual({
      data: [level2],
      count: 1
    });
  });
});