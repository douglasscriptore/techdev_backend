import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import LevelsController from '../controllers/LevelsController';

const levelsController = new LevelsController();

const levelsRouter = Router();

levelsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      filter: Joi.string(),
      take: Joi.number(),
      skip: Joi.number(),
    },
  }),
  levelsController.index,
);

levelsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number(),
    },
  }),
  levelsController.show,
);

levelsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      levelname: Joi.string().required(),
    },
  }),
  levelsController.create,
);

levelsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number(),
    },
    [Segments.BODY]: {
      levelname: Joi.string().required(),
    },
  }),
  levelsController.update,
);

levelsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number(),
    },
  }),
  levelsController.destroy,
);

export default levelsRouter;
