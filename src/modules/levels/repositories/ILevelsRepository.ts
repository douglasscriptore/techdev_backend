import ICreateLevelDTO from '../dtos/ICreateLevelDTO';
import IFindLevelDTO from '../dtos/IFindLevelDTO';
import Level from '../infra/typeorm/entities/Level';

export default interface ILevelsRepository {
  findAll(data: IFindLevelDTO): Promise<{ data: Level[]; count: number }>;
  findById(id: number): Promise<Level | undefined>;
  create(data: ICreateLevelDTO): Promise<Level>;
  save(level: Level): Promise<Level>;
  delete(id: number): Promise<void>;
}
