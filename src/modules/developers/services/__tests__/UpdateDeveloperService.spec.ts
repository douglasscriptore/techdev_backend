import FakeDevelopersRepository from '@modules/developers/repositories/fakes/FakeDevelopersRepository';
import AppError from '@shared/errors/AppError';
import FakeLevelsRepository from '@modules/levels/repositories/fakes/FakeLevelsRepository';

import UpdateDevelopersService from '../UpdateDevelopersService';
import { EnumGender } from '@modules/developers/infra/typeorm/entities/Developer';

describe('UpdateDeveloperService', () => {
  let fakeLevelsRepository: FakeLevelsRepository;
  let fakeDevelopersRepository: FakeDevelopersRepository;
  let updateDeveloperService: UpdateDevelopersService;
  beforeEach(() => {
    fakeLevelsRepository = new FakeLevelsRepository();
    fakeDevelopersRepository = new FakeDevelopersRepository();
    updateDeveloperService = new UpdateDevelopersService(
      fakeDevelopersRepository,
      fakeLevelsRepository,
    );
  });

  it('should be able to update developer', async () => {
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

    const updatedDeveloper = await updateDeveloperService.execute({
      id: developer.id,
      fullname: 'douglas bento',
    });

    expect(updatedDeveloper.fullname).toEqual('douglas bento');
  });

  it('should be able to update non existing developer', async () => {
    await expect(
      updateDeveloperService.execute({
        id: 123,
        fullname: 'Douglas Bento Scriptore',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update non existing level', async () => {
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

    await expect(
      updateDeveloperService.execute({
        id: developer.id,
        level_id: 123,
        fullname: 'Douglas Bento Scriptore',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
