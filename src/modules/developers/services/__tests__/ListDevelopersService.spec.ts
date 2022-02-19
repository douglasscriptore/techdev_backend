import { EnumGender } from '@modules/developers/infra/typeorm/entities/Developer';
import FakeDevelopersRepository from '@modules/developers/repositories/fakes/FakeDevelopersRepository';
import FakeLevelsRepository from '@modules/levels/repositories/fakes/FakeLevelsRepository';
import CreateLevelService from '@modules/levels/services/CreateLevelService';
import AppError from '@shared/errors/AppError';
import CreateDeveloperService from '../CreateDeveloperService';
import ListDevelopersService from '../ListDevelopersService';

describe('ListDevelopersService', () => {
  let fakeDevelopersRepository: FakeDevelopersRepository;
  let fakeLevelsRepository: FakeLevelsRepository;
  let createDeveloperService: CreateDeveloperService;
  let listDevelopersService: ListDevelopersService;
  beforeEach(() => {
    fakeDevelopersRepository = new FakeDevelopersRepository();
    fakeLevelsRepository = new FakeLevelsRepository();
    createDeveloperService = new CreateDeveloperService(
      fakeDevelopersRepository,
      fakeLevelsRepository,
    );
    listDevelopersService = new ListDevelopersService(fakeDevelopersRepository);
  });

  it('should be able to list all developers', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const developer = await createDeveloperService.execute({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Bento Scriptore',
      gender: EnumGender.Male,
      level_id: level.id,
    });

    const developers = await listDevelopersService.execute({});

    expect(developers).toEqual({ data: [developer], count: 1 });
  });

  it('should be able to list developers with filter', async () => {
    const level = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const developer = await createDeveloperService.execute({
      dateofborn: new Date('12/04/1991'),
      age: 30,
      fullname: 'Douglas Bento Scriptore',
      gender: EnumGender.Male,
      level_id: level.id,
    });

    const developers = await listDevelopersService.execute({ name: 'Dou' });

    expect(developers).toEqual({ data: [developer], count: 1 });
  });
});
