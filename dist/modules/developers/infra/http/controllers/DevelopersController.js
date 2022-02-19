"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateDeveloperService = _interopRequireDefault(require("../../../services/CreateDeveloperService"));

var _DeleteDeveloperService = _interopRequireDefault(require("../../../services/DeleteDeveloperService"));

var _FindDeveloperService = _interopRequireDefault(require("../../../services/FindDeveloperService"));

var _ListDevelopersService = _interopRequireDefault(require("../../../services/ListDevelopersService"));

var _UpdateDevelopersService = _interopRequireDefault(require("../../../services/UpdateDevelopersService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DevelopersController {
  async index(request, response) {
    const {
      name,
      level_ids,
      take,
      skip
    } = request.query;

    const listDevelopersService = _tsyringe.container.resolve(_ListDevelopersService.default);

    const developers = await listDevelopersService.execute({
      name: name?.toString(),
      unformated_level_ids: level_ids?.toString(),
      take: Number(take),
      skip: Number(skip)
    });
    return response.json(developers);
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const findDeveloperService = _tsyringe.container.resolve(_FindDeveloperService.default);

    const developer = await findDeveloperService.execute({
      id: Number(id)
    });
    return response.json(developer);
  }

  async create(request, response) {
    const {
      fullname,
      gender,
      dateofborn,
      age,
      level_id
    } = request.body;

    const createDeveloperService = _tsyringe.container.resolve(_CreateDeveloperService.default);

    const developer = await createDeveloperService.execute({
      fullname,
      gender,
      dateofborn,
      age,
      level_id
    });
    return response.json(developer);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      fullname,
      gender,
      dateofborn,
      age,
      level_id
    } = request.body;

    const updateDeveloperService = _tsyringe.container.resolve(_UpdateDevelopersService.default);

    const developer = await updateDeveloperService.execute({
      id: Number(id),
      fullname,
      gender,
      dateofborn,
      age,
      level_id
    });
    return response.json(developer);
  }

  async destroy(request, response) {
    const {
      id
    } = request.params;

    const deleteDeveloperService = _tsyringe.container.resolve(_DeleteDeveloperService.default);

    await deleteDeveloperService.execute({
      id: Number(id)
    });
    return response.send();
  }

}

var _default = DevelopersController;
exports.default = _default;