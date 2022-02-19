import AppError from '@shared/errors/AppError';
import FakeLevelsRepository from '../../repositories/fakes/FakeLevelsRepository';

import UpdateLevelService from '../UpdateLevelService';

describe('UpdateLevelService', () => {
  let fakeLevelsRepository: FakeLevelsRepository;
  let updateLevelService: UpdateLevelService;
  beforeEach(() => {
    fakeLevelsRepository = new FakeLevelsRepository();
    updateLevelService = new UpdateLevelService(fakeLevelsRepository);
  });

  it('should be able to update level', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const updatedLevel = await updateLevelService.execute({
      id: level.id,
      levelname: 'Junior Software Enginer',
    });

    expect(updatedLevel.levelname).toEqual('Junior Software Enginer');
  });

  it('should be able to update non existing level', async () => {
    await expect(
      updateLevelService.execute({
        id: 123,
        levelname: 'Frontend Developer',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
