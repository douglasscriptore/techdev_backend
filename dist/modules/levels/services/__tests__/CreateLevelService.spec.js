"use strict";

var _FakeLevelsRepository = _interopRequireDefault(require("../../repositories/fakes/FakeLevelsRepository"));

var _CreateLevelService = _interopRequireDefault(require("../CreateLevelService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CreateLevelService', () => {
  let fakeLevelsRepository;
  let createLevelService;
  beforeEach(() => {
    fakeLevelsRepository = new _FakeLevelsRepository.default();
    createLevelService = new _CreateLevelService.default(fakeLevelsRepository);
  });
  it('should be able to create a new level', async () => {
    const level = await createLevelService.execute({
      levelname: 'Senior Software Enginer'
    });
    expect(level).toHaveProperty('id');
  });
});