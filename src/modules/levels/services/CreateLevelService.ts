import { inject, injectable } from 'tsyringe';
import ICreateLevelDTO from '../dtos/ICreateLevelDTO';
import Level from '../infra/typeorm/entities/Level';
import ILevelsRepository from '../repositories/ILevelsRepository';

type IRequest = ICreateLevelDTO;
@injectable()
class CreateLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({ levelname }: IRequest): Promise<Level> {
    const level = await this.levelsRepository.create({ levelname });

    return level;
  }
}

export default CreateLevelService;
