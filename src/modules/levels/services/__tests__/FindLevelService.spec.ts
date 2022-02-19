import AppError from '@shared/errors/AppError';
import FakeLevelsRepository from '../../repositories/fakes/FakeLevelsRepository';
import FindLevelService from '../FindLevelService';

describe('FindLevelService', () => {
  let fakeLevelsRepository: FakeLevelsRepository;
  let findLevelService: FindLevelService;
  beforeEach(() => {
    fakeLevelsRepository = new FakeLevelsRepository();
    findLevelService = new FindLevelService(fakeLevelsRepository);
  });

  it('should be able show the level', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const findedLevel = await findLevelService.execute({ id: level.id });

    expect(findedLevel.levelname).toBe('senior software enginer');
  });

  it('should not be able show the level if id not existing', async () => {
    await expect(findLevelService.execute({ id: 123 })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
