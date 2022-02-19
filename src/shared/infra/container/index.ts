import { container } from 'tsyringe';

import LevelsRespository from '@modules/levels/infra/typeorm/repositories/LevelsRepository';
import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';

import DevelopersRepository from '@modules/developers/infra/typeorm/repositories/DevelopersRepository';
import IDevelopersRepository from '@modules/developers/repositories/IDevelopersRepository';

container.registerSingleton<ILevelsRepository>(
  'LevelsRespository',
  LevelsRespository,
);

container.registerSingleton<IDevelopersRepository>(
  'DevelopersRepository',
  DevelopersRepository,
);
