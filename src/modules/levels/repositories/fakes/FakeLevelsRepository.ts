import ICreateLevelDTO from '@modules/levels/dtos/ICreateLevelDTO';
import Level from '@modules/levels/infra/typeorm/entities/Level';
import ILevelsRepository from '../ILevelsRepository';

class FakeLevelsRepository implements ILevelsRepository {
  private levels: Level[] = [];

  public async findAll(): Promise<Level[]> {
    return this.levels;
  }

  public async findById(id: number): Promise<Level | undefined> {
    const level = this.levels.find(level => level.id === id);
    return level;
  }

  public async create(levelData: ICreateLevelDTO): Promise<Level> {
    const level = new Level();

    Object.assign(level, { id: new Date().getTime() }, levelData);

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
}

export default FakeLevelsRepository;
