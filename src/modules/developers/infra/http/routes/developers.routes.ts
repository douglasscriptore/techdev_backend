import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { EnumGender } from '../../typeorm/entities/Developer';
import DevelopersController from '../controllers/DevelopersController';

const developersController = new DevelopersController();

const developersRouter = Router();

developersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      level_ids: Joi.string(),
      take: Joi.number(),
      skip: Joi.number(),
    },
  }),
  developersController.index,
);

developersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number(),
    },
  }),
  developersController.show,
);

developersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullname: Joi.string().required(),
      gender: Joi.string()
        .valid(...Object.values(EnumGender))
        .required(),
      dateofborn: Joi.date().required(),
      age: Joi.number().required(),
      level_id: Joi.number().required(),
    },
  }),
  developersController.create,
);

developersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number(),
    },
    [Segments.BODY]: {
      fullname: Joi.string(),
      gender: Joi.string().valid(...Object.values(EnumGender)),
      dateofborn: Joi.date(),
      age: Joi.number(),
      level_id: Joi.number(),
    },
  }),
  developersController.update,
);

developersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number(),
    },
  }),
  developersController.destroy,
);

export default developersRouter;
