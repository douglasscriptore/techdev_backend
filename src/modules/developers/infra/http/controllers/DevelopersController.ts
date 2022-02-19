import CreateDeveloperService from '@modules/developers/services/CreateDeveloperService';
import ListDevelopersService from '@modules/developers/services/ListDevelopersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DevelopersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { fullname, level_ids, take, skip } = request.query;
    const listDevelopersService = container.resolve(ListDevelopersService);

    const developers = await listDevelopersService.execute({
      fullname: fullname?.toString(),
      unformated_level_ids: level_ids?.toString(),
      take: Number(take),
      skip: Number(skip),
    });

    return response.json(developers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    return response.send();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { fullname, gender, dateofborn, age, level_id } = request.body;

    const createDeveloperService = container.resolve(CreateDeveloperService);
    const developer = await createDeveloperService.execute({
      fullname,
      gender,
      dateofborn,
      age,
      level_id,
    });

    return response.json(developer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { fullname, gender, dateofborn, age, level_id } = request.body;

    return response.send();
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    return response.send();
  }
}

export default DevelopersController;
