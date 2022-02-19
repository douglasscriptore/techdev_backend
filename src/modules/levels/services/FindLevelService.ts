import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateLevelDTO from '../dtos/ICreateLevelDTO';
import Level from '../infra/typeorm/entities/Level';
import ILevelsRepository from '../repositories/ILevelsRepository';

interface IRequest {
  id: number;
}
@injectable()
class CreateLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Level> {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new AppError('Nível nao localizado');
    }

    return level;
  }
}

export default CreateLevelService;
