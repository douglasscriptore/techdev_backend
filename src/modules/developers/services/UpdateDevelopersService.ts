import { inject, injectable } from 'tsyringe';
import Developer, { EnumGender } from '../infra/typeorm/entities/Developer';
import IDevelopersRepository from '../repositories/IDevelopersRepository';
import ICreateDeveloperDTO from '../dtos/ICreateDeveloperDTO';
import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: number;
  fullname?: string;
  gender?: EnumGender;
  dateofborn?: Date;
  age?: number;
  level_id?: number;
}

@injectable()
class UpdateDevelopersService {
  constructor(
    @inject('DevelopersRepository')
    private developersRepository: IDevelopersRepository,
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({
    id,
    age,
    dateofborn,
    fullname,
    gender,
    level_id,
  }: IRequest): Promise<Developer> {
    const developer = await this.developersRepository.findById(id);

    if (!developer) {
      throw new AppError('Desenvolvedor não localizado');
    }

    if (level_id) {
      const level = await this.levelsRepository.findById(level_id);
      if (!level) {
        throw new AppError('Nível não localizado');
      }

      developer.level = level;
    }

    if (!!age) developer.age = age;
    if (!!dateofborn) developer.dateofborn = dateofborn;
    if (!!fullname) developer.fullname = fullname;
    if (!!gender) developer.gender = gender;

    await this.developersRepository.save(developer);

    return developer;
  }
}

export default UpdateDevelopersService;
