import ICreateLevelDTO from '@modules/levels/dtos/ICreateLevelDTO';
import IFindLevelDTO from '@modules/levels/dtos/IFindLevelDTO';
import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Level from '../entities/Level';

class LevelsRepository implements ILevelsRepository {
  private ormRepository: Repository<Level>;

  constructor() {
    this.ormRepository = getRepository(Level);
  }

  public async findAll({
    filter = '',
    take = 10,
    skip = 0,
  }: IFindLevelDTO): Promise<{ data: Level[]; count: number }> {
    const [data, total] = await this.ormRepository.findAndCount({
      where: {
        levelname: Like(`%${filter.toLocaleLowerCase()}%`),
      },
      relations: ['developers'],
      take,
      skip,
      order: { created_at: 'DESC' },
    });

    return { data, count: total };
  }

  public async findById(id: number): Promise<Level | undefined> {
    return await this.ormRepository.findOne({ id });
  }

  public async create(levelData: ICreateLevelDTO): Promise<Level> {
    const level = this.ormRepository.create({
      ...levelData,
      levelname: levelData.levelname.toLowerCase(),
    });

    await this.ormRepository.save(level);

    return level;
  }

  public async save(level: Level): Promise<Level> {
    return await this.ormRepository.save(level);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default LevelsRepository;
