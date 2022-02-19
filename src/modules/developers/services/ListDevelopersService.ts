import { inject, injectable } from 'tsyringe';
import IFindDeveloperDTO from '../dtos/IFindDeveloperDTO';
import Developer from '../infra/typeorm/entities/Developer';
import IDevelopersRepository from '../repositories/IDevelopersRepository';

interface IRequest extends IFindDeveloperDTO {
  unformated_level_ids?: string;
}

@injectable()
class ListDevelopersService {
  constructor(
    @inject('DevelopersRepository')
    private developersRepository: IDevelopersRepository,
  ) {}

  public async execute({
    fullname,
    unformated_level_ids,
    skip,
    take,
  }: IRequest): Promise<{ data: Developer[]; count?: number }> {
    const formatedLevelIds =
      (unformated_level_ids &&
        unformated_level_ids.split(',').map(id => Number(id))) ||
      [];

    const levels = await this.developersRepository.findAll({
      fullname,
      level_ids: formatedLevelIds,
      skip,
      take,
    });

    return levels;
  }
}

export default ListDevelopersService;
