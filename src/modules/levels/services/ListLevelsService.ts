import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateLevelDTO from '../dtos/ICreateLevelDTO';
import IFindLevelDTO from '../dtos/IFindLevelDTO';
import Level from '../infra/typeorm/entities/Level';
import ILevelsRepository from '../repositories/ILevelsRepository';

type IRequest = IFindLevelDTO;

@injectable()
class ListLevelsService {
  constructor(
    @inject('LevelsRespository')
    private levelsRepository: ILevelsRepository,
  ) {}

  public async execute({
    filter,
    skip,
    take,
  }: IRequest): Promise<{ data: Level[]; count?: number }> {
    const levels = await this.levelsRepository.findAll({ filter, skip, take });

    return levels;
  }
}

export default ListLevelsService;
