import ICreateDeveloperDTO from '../dtos/ICreateDeveloperDTO';
import IFindDeveloperDTO from '../dtos/IFindDeveloperDTO';
import Developer from '../infra/typeorm/entities/Developer';

export default interface IDevelopersRepository {
  findAll(
    data: IFindDeveloperDTO,
  ): Promise<{ data: Developer[]; count: number }>;
  findById(id: number): Promise<Developer | undefined>;
  create(data: ICreateDeveloperDTO): Promise<Developer>;
  save(level: Developer): Promise<Developer>;
  delete(id: number): Promise<void>;
}
