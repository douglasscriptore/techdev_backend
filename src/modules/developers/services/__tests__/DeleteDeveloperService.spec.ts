import AppError from '@shared/errors/AppError';
import FakeLevelsRepository from '@modules/levels/repositories/fakes/FakeLevelsRepository';
import FakeDevelopersRepository from '../../repositories/fakes/FakeDevelopersRepository';
import DeleteDeveloperService from '../DeleteDeveloperService';
import { EnumGender } from '@modules/developers/infra/typeorm/entities/Developer';

describe('DeleteDeveloperService.spec', () => {
  let fakeLevelsRepository: FakeLevelsRepository;
  let fakeDevelopersRepository: FakeDevelopersRepository;
  let deleteDeveloperService: DeleteDeveloperService;
  beforeEach(() => {
    fakeLevelsRepository = new FakeLevelsRepository();
    fakeDevelopersRepository = new FakeDevelopersRepository();
    deleteDeveloperService = new DeleteDeveloperService(
      fakeDevelopersRepository,
    );
  });

  it('should be able delete the level', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const developer = await fakeDevelopersRepository.create({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Scriptore',
      gender: EnumGender.Male,
      level_id: level.id,
    });

    const deletedDeveloper = await deleteDeveloperService.execute({
      id: developer.id,
    });

    expect(deletedDeveloper).toEqual(undefined);
  });

  it('should not be able delete the level if id not existing', async () => {
    await expect(
      deleteDeveloperService.execute({ id: 123 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
