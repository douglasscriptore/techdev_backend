import AppError from '@shared/errors/AppError';
import FakeLevelsRepository from '../../repositories/fakes/FakeLevelsRepository';

import ListLevelsService from '../ListLevelsService';

describe('ListLevelsService', () => {
  let fakeLevelsRepository: FakeLevelsRepository;
  let listLevelsService: ListLevelsService;
  beforeEach(() => {
    fakeLevelsRepository = new FakeLevelsRepository();
    listLevelsService = new ListLevelsService(fakeLevelsRepository);
  });

  it('should be able to list the levels', async () => {
    const level1 = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const level2 = await fakeLevelsRepository.create({
      levelname: 'Junior Developer',
    });

    const levels = await listLevelsService.execute({});

    expect(levels).toEqual({ data: [level1, level2], count: 2 });
  });

  it('should be able to list with filter', async () => {
    const level1 = await fakeLevelsRepository.create({
      levelname: 'Senior Software Enginer',
    });

    const level2 = await fakeLevelsRepository.create({
      levelname: 'Junior Developer',
    });

    const levels = await listLevelsService.execute({ filter: 'unIor' });

    expect(levels).toEqual({ data: [level2], count: 1 });
  });
});
