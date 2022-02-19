import { EnumGender } from '@modules/developers/infra/typeorm/entities/Developer';
import FakeDevelopersRepository from '@modules/developers/repositories/fakes/FakeDevelopersRepository';
import FakeLevelsRepository from '@modules/levels/repositories/fakes/FakeLevelsRepository';
import CreateLevelService from '@modules/levels/services/CreateLevelService';
import AppError from '@shared/errors/AppError';
import CreateDeveloperService from '../CreateDeveloperService';

describe('CreateDeveloperService', () => {
  let fakeDevelopersRepository: FakeDevelopersRepository;
  let fakeLevelsRepository: FakeLevelsRepository;
  let createDeveloperService: CreateDeveloperService;
  beforeEach(() => {
    fakeDevelopersRepository = new FakeDevelopersRepository();
    fakeLevelsRepository = new FakeLevelsRepository();
    createDeveloperService = new CreateDeveloperService(
      fakeDevelopersRepository,
      fakeLevelsRepository,
    );
  });

  it('should be able to create a new developer', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const developer = await createDeveloperService.execute({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Scriptore',
      gender: EnumGender.Male,
      level_id: level.id,
    });

    expect(developer).toHaveProperty('id');
  });

  it('should not be able to create developer with non existing level id', async () => {
    await expect(
      createDeveloperService.execute({
        dateofborn: new Date('12/04/1991'),
        age: 30,
        fullname: 'Douglas Scriptore',
        gender: EnumGender.Male,
        level_id: 123,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
