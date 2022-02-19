import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IDevelopersRepository from '../repositories/IDevelopersRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteDeveloperService {
  constructor(
    @inject('DevelopersRepository')
    private developersRepository: IDevelopersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const developer = await this.developersRepository.findById(id);

    if (!developer) {
      throw new AppError('Desenvolvedor nao localizado');
    }

    await this.developersRepository.delete(developer.id);
  }
}

export default DeleteDeveloperService;
