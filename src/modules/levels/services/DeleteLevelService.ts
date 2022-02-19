import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ILevelsRepository from '../repositories/ILevelsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteLevelService {
  constructor(
    @inject('LevelsRespository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new AppError('Nível nao localizado');
    }

    await this.levelsRepository.delete(level.id);
  }
}

export default DeleteLevelService;
