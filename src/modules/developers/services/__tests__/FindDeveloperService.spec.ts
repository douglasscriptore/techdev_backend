import AppError from '@shared/errors/AppError';
import FakeLevelsRepository from '@modules/levels/repositories/fakes/FakeLevelsRepository';
import FakeDevelopersRepository from '../../repositories/fakes/FakeDevelopersRepository';
import FindDeveloperService from '../FindDeveloperService';
import { EnumGender } from '@modules/developers/infra/typeorm/entities/Developer';

describe('FindDeveloperService', () => {
  let fakeLevelsRepository: FakeLevelsRepository;
  let fakeDevelopersRepository: FakeDevelopersRepository;
  let findDeveloperService: FindDeveloperService;
  beforeEach(() => {
    fakeLevelsRepository = new FakeLevelsRepository();
    fakeDevelopersRepository = new FakeDevelopersRepository();
    findDeveloperService = new FindDeveloperService(fakeDevelopersRepository);
  });

  it('should be able show the developer', async () => {
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

    const findedDeveloper = await findDeveloperService.execute({
      id: developer.id,
    });

    expect(findedDeveloper.fullname).toBe('douglas scriptore');
  });

  it('should not be able show the developer if id not existing', async () => {
    await expect(
      findDeveloperService.execute({ id: 123 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
