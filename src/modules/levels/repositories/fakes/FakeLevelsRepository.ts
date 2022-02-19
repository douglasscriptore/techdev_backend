import ICreateLevelDTO from '@modules/levels/dtos/ICreateLevelDTO';
import IFindLevelDTO from '@modules/levels/dtos/IFindLevelDTO';
import Level from '@modules/levels/infra/typeorm/entities/Level';
import ILevelsRepository from '../ILevelsRepository';

class FakeLevelsRepository implements ILevelsRepository {
  private levels: Level[] = [];

  public async findAll({
    filter = '',
  }: IFindLevelDTO): Promise<{ data: Level[]; count: number }> {
    const filteredLevels = this.levels.filter(le =>
      le.levelname.includes(filter.toLocaleLowerCase()),
    );

    return { data: filteredLevels, count: filteredLevels.length };
  }

  public async findById(id: number): Promise<Level | undefined> {
    const level = this.levels.find(level => level.id === id);
    return level;
  }

  public async create(levelData: ICreateLevelDTO): Promise<Level> {
    const level = new Level();

    Object.assign(
      level,
      { id: new Date().getTime() },
      { ...levelData, levelname: levelData.levelname.toLocaleLowerCase() },
    );

    this.levels.push(level);

    return level;
  }

  public async save(level: Level): Promise<Level> {
    const findIndex = this.levels.findIndex(
      findLevel => findLevel.id === level.id,
    );

    this.levels[findIndex] = level;

    return level;
  }

  public async delete(id: number): Promise<void> {
    this.levels.filter(level => level.id !== id);
  }
}

export default FakeLevelsRepository;
