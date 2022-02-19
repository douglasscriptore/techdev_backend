import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICreateDeveloperDTO from '../dtos/ICreateDeveloperDTO';
import Developer from '../infra/typeorm/entities/Developer';
import IDevelopersRepository from '../repositories/IDevelopersRepository';

type IRequest = ICreateDeveloperDTO;

@injectable()
class CreateDeveloperService {
  constructor(
    @inject('DevelopersRepository')
    private developersRepository: IDevelopersRepository,
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({
    fullname,
    age,
    dateofborn,
    gender,
    level_id,
  }: IRequest): Promise<Developer> {
    // check if level_id exists
    const level = await this.levelsRepository.findById(level_id);

    if (!level) {
      throw new AppError(
        'Não é possivel cadastrar esse desenvolvedor pois o nível não existe',
      );
    }

    const developer = await this.developersRepository.create({
      fullname,
      age,
      dateofborn,
      gender,
      level_id,
    });

    return developer;
  }
}

export default CreateDeveloperService;
