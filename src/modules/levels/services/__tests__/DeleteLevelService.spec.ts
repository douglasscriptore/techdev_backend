import FakeDevelopersRepository from '@modules/developers/repositories/fakes/FakeDevelopersRepository';
import AppError from '@shared/errors/AppError';
import FakeLevelsRepository from '../../repositories/fakes/FakeLevelsRepository';
import DeleteLevelService from '../DeleteLevelService';

describe('DeleteLeveService', () => {
  let fakeLevelsRepository: FakeLevelsRepository;
  let fakeDevelopersRepository: FakeDevelopersRepository;
  let deleteLevelService: DeleteLevelService;
  beforeEach(() => {
    fakeLevelsRepository = new FakeLevelsRepository();
    fakeDevelopersRepository = new FakeDevelopersRepository();
    deleteLevelService = new DeleteLevelService(
      fakeLevelsRepository,
      fakeDevelopersRepository,
    );
  });

  it('should be able delete the level', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const deletedLevel = await deleteLevelService.execute({ id: level.id });

    expect(deletedLevel).toEqual(undefined);
  });

  it('should not be able delete the level if id not existing', async () => {
    await expect(
      deleteLevelService.execute({ id: 123 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able delete if levels have developers associate', async () => {
    // FAZER ESSE AQUI
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    await expect(
      deleteLevelService.execute({ id: 123 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
