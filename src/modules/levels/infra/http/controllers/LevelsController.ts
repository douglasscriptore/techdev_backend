import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToPlain } from 'class-transformer';

import CreateLevelService from '@modules/levels/services/CreateLevelService';
import DeleteLevelService from '@modules/levels/services/DeleteLevelService';
import FindLevelService from '@modules/levels/services/FindLevelService';
import ListLevelsService from '@modules/levels/services/ListLevelsService';
import UpdateLevelService from '@modules/levels/services/UpdateLevelService';

class LevelsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { filter, take, skip } = request.query;

    const listLevelsService = container.resolve(ListLevelsService);
    const levels = await listLevelsService.execute({
      filter: filter?.toString(),
      skip: Number(skip),
      take: Number(take),
    });

    return response.json(instanceToPlain(levels));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findLevelService = container.resolve(FindLevelService);
    const level = await findLevelService.execute({ id: Number(id) });

    return response.json(level);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { levelname } = request.body;

    const createLevelService = container.resolve(CreateLevelService);
    const level = await createLevelService.execute({ levelname });

    return response.json(level);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { levelname } = request.body;

    const updateLevelService = container.resolve(UpdateLevelService);
    const level = await updateLevelService.execute({
      id: Number(id),
      levelname,
    });

    return response.json(level);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteLevelService = container.resolve(DeleteLevelService);

    await deleteLevelService.execute({ id: Number(id) });

    return response.send();
  }
}

export default LevelsController;
