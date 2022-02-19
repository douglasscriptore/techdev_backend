import ICreateDeveloperDTO from '@modules/developers/dtos/ICreateDeveloperDTO';
import IFindDeveloperDTO from '@modules/developers/dtos/IFindDeveloperDTO';
import Developer from '@modules/developers/infra/typeorm/entities/Developer';
import IDevelopersRepository from '../IDevelopersRepository';

class FakeDevelopersRepository implements IDevelopersRepository {
  private developers: Developer[] = [];

  public async findAll({
    name = '',
    level_ids = [],
  }: IFindDeveloperDTO): Promise<{ data: Developer[]; count: number }> {
    const filteredDevelopers = this.developers.filter(dev =>
      dev.fullname.includes(name.toLocaleLowerCase()),
    );

    return { data: filteredDevelopers, count: filteredDevelopers.length };
  }

  public async findById(id: number): Promise<Developer | undefined> {
    const developer = this.developers.find(developer => developer.id === id);
    return developer;
  }

  public async create(developerData: ICreateDeveloperDTO): Promise<Developer> {
    const developer = new Developer();

    Object.assign(
      developer,
      { id: new Date().getTime() },
      {
        ...developerData,
        fullname: developerData.fullname.toLocaleLowerCase(),
      },
    );

    this.developers.push(developer);

    return developer;
  }

  public async save(developer: Developer): Promise<Developer> {
    const findIndex = this.developers.findIndex(
      findDev => findDev.id === developer.id,
    );

    this.developers[findIndex] = developer;

    return developer;
  }

  public async delete(id: number): Promise<void> {
    this.developers.filter(developer => developer.id !== id);
  }
}

export default FakeDevelopersRepository;
