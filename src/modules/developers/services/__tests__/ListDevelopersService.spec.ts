import { EnumGender } from '@modules/developers/infra/typeorm/entities/Developer';
import FakeDevelopersRepository from '@modules/developers/repositories/fakes/FakeDevelopersRepository';
import FakeLevelsRepository from '@modules/levels/repositories/fakes/FakeLevelsRepository';
import CreateLevelService from '@modules/levels/services/CreateLevelService';
import AppError from '@shared/errors/AppError';
import CreateDeveloperService from '../CreateDeveloperService';

describe('ListDevelopersService', () => {
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

  it('should be able to list all developers', async () => {});

  it('should be able to list developers with filter', async () => {});
});
