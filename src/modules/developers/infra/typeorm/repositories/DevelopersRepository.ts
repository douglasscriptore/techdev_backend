import ICreateLevelDTO from '@modules/developers/dtos/ICreateDeveloperDTO';
import IFindDeveloperDTO from '@modules/developers/dtos/IFindDeveloperDTO';
import IDevelopersRepository from '@modules/developers/repositories/IDevelopersRepository';
import { getRepository, In, Like, Repository } from 'typeorm';
import Developer from '../entities/Developer';

class DevelopersRepository implements IDevelopersRepository {
  private ormRepository: Repository<Developer>;

  constructor() {
    this.ormRepository = getRepository(Developer);
  }

  public async findAll({
    fullname = '',
    level_ids = [],
    take = 10,
    skip = 0,
  }: IFindDeveloperDTO): Promise<{ data: Developer[]; count: number }> {
    const filter = level_ids.length > 0 && { level_id: In(level_ids) };

    const [data, total] = await this.ormRepository.findAndCount({
      where: {
        fullname: Like(`%${fullname.toLocaleLowerCase()}%`),
        ...filter,
      },
      relations: ['level'],
      take,
      skip,
    });

    return { data, count: total };
  }

  public async findById(id: number): Promise<Developer | undefined> {
    return await this.ormRepository.findOne({ id }, { relations: ['level'] });
  }

  public async create(developerData: ICreateLevelDTO): Promise<Developer> {
    const developer = this.ormRepository.create({
      ...developerData,
      fullname: developerData.fullname.toLocaleLowerCase(),
    });

    await this.ormRepository.save(developer);

    return developer;
  }

  public async save(developer: Developer): Promise<Developer> {
    return await this.ormRepository.save(developer);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default DevelopersRepository;
