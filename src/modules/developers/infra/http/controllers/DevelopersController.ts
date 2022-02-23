import CreateDeveloperService from '@modules/developers/services/CreateDeveloperService';
import DeleteDeveloperService from '@modules/developers/services/DeleteDeveloperService';
import FindDeveloperService from '@modules/developers/services/FindDeveloperService';
import ListDevelopersService from '@modules/developers/services/ListDevelopersService';
import UpdateDevelopersService from '@modules/developers/services/UpdateDevelopersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DevelopersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, level_ids, take, skip } = request.query;
    const listDevelopersService = container.resolve(ListDevelopersService);

    const developers = await listDevelopersService.execute({
      name: name?.toString(),
      unformated_level_ids: level_ids?.toString(),
      take: Number(take),
      skip: Number(skip),
    });

    return response.json(developers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findDeveloperService = container.resolve(FindDeveloperService);
    const developer = await findDeveloperService.execute({ id: Number(id) });

    return response.json(developer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { fullname, gender, dateofborn, age, hobby, level_id } = request.body;

    const createDeveloperService = container.resolve(CreateDeveloperService);
    const developer = await createDeveloperService.execute({
      fullname,
      hobby,
      gender,
      dateofborn,
      age,
      level_id,
    });

    return response.json(developer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { fullname, gender, dateofborn, age, level_id, hobby } = request.body;

    const updateDeveloperService = container.resolve(UpdateDevelopersService);
    const developer = await updateDeveloperService.execute({
      id: Number(id),
      fullname,
      hobby,
      gender,
      dateofborn,
      age,
      level_id,
    });

    return response.json(developer);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteDeveloperService = container.resolve(DeleteDeveloperService);
    await deleteDeveloperService.execute({ id: Number(id) });

    return response.send();
  }
}

export default DevelopersController;
