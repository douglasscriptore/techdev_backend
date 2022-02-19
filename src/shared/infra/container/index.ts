import LevelsRespository from '@modules/levels/infra/typeorm/repositories/LevelsRepository';
import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ILevelsRepository>(
  'LevelsRespository',
  LevelsRespository,
);
