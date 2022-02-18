import ICreateLevelDTO from '../dtos/ICreateLevelDTO';
import Level from '../infra/typeorm/entities/Level';

export default interface ILevelsRepository {
  findAll(): Promise<Level[]>;
  findById(id: number): Promise<Level | undefined>;
  create(data: ICreateLevelDTO): Promise<Level>;
  save(level: Level): Promise<Level>;
}
