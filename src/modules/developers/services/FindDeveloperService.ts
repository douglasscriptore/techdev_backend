import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Developer from '../infra/typeorm/entities/Developer';
import IDevelopersRepository from '../repositories/IDevelopersRepository';

interface IRequest {
  id: number;
}

@injectable()
class FindDeveloperService {
  constructor(
    @inject('DevelopersRepository')
    private developersRepository: IDevelopersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Developer> {
    const developer = await this.developersRepository.findById(id);

    if (!developer) {
      throw new AppError('Desenvolvedor não localizado');
    }

    return developer;
  }
}

export default FindDeveloperService;
