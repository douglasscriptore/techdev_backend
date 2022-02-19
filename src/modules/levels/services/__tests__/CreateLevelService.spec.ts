import FakeLevelsRepository from '../../repositories/fakes/FakeLevelsRepository';
import CreateLevelService from '../CreateLevelService';

describe('CreateLevelService', () => {
  let fakeLevelsRepository: FakeLevelsRepository;
  let createLevelService: CreateLevelService;
  beforeEach(() => {
    fakeLevelsRepository = new FakeLevelsRepository();
    createLevelService = new CreateLevelService(fakeLevelsRepository);
  });

  it('should be able to create a new level', async () => {
    const level = await createLevelService.execute({
      levelname: 'Senior Software Enginer',
    });

    expect(level).toHaveProperty('id');
  });
});
