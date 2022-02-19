import IDevelopersRepository from '@modules/developers/repositories/IDevelopersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ILevelsRepository from '../repositories/ILevelsRepository';

interface IRequest {
  id: number;
}

@injectable()
class DeleteLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
    @inject('DevelopersRepository')
    private developersRepository: IDevelopersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new AppError('Nível nao localizado');
    }

    const developers = await this.developersRepository.findAll({
      level_ids: [level.id],
    });

    if (developers.data.length > 0) {
      throw new AppError(
        'Não é possível deletar esse nível, pois existem desenvolvedores associados',
      );
    }

    await this.levelsRepository.delete(level.id);
  }
}

export default DeleteLevelService;
