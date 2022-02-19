import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Level from '../infra/typeorm/entities/Level';
import ILevelsRepository from '../repositories/ILevelsRepository';

interface IRequest {
  id: number;
  levelname: string;
}

@injectable()
class UpdateLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({ levelname, id }: IRequest): Promise<Level> {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new AppError('Nível nao localizado');
    }

    level.levelname = levelname;
    await this.levelsRepository.save(level);

    return level;
  }
}

export default UpdateLevelService;
