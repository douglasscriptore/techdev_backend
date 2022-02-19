"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateLevelService = _interopRequireDefault(require("../../../services/CreateLevelService"));

var _DeleteLevelService = _interopRequireDefault(require("../../../services/DeleteLevelService"));

var _FindLevelService = _interopRequireDefault(require("../../../services/FindLevelService"));

var _ListLevelsService = _interopRequireDefault(require("../../../services/ListLevelsService"));

var _UpdateLevelService = _interopRequireDefault(require("../../../services/UpdateLevelService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LevelsController {
  async index(request, response) {
    const {
      filter,
      take,
      skip
    } = request.query;

    const listLevelsService = _tsyringe.container.resolve(_ListLevelsService.default);

    const levels = await listLevelsService.execute({
      filter: filter?.toString(),
      skip: Number(skip),
      take: Number(take)
    });
    return response.json(levels);
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const findLevelService = _tsyringe.container.resolve(_FindLevelService.default);

    const level = await findLevelService.execute({
      id: Number(id)
    });
    return response.json(level);
  }

  async create(request, response) {
    const {
      levelname
    } = request.body;

    const createLevelService = _tsyringe.container.resolve(_CreateLevelService.default);

    const level = await createLevelService.execute({
      levelname
    });
    return response.json(level);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      levelname
    } = request.body;

    const updateLevelService = _tsyringe.container.resolve(_UpdateLevelService.default);

    const level = await updateLevelService.execute({
      id: Number(id),
      levelname
    });
    return response.json(level);
  }

  async destroy(request, response) {
    const {
      id
    } = request.params;

    const deleteLevelService = _tsyringe.container.resolve(_DeleteLevelService.default);

    await deleteLevelService.execute({
      id: Number(id)
    });
    return response.send();
  }

}

var _default = LevelsController;
exports.default = _default;