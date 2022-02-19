import { Router, Request, Response } from 'express';

/*
 * Modules Router
 */

import developersRouter from '@modules/developers/infra/http/routes/developers.routes';
import levelsRouter from '@modules/levels/infra/http/routes/levels.routes';

const routes = Router();

routes.use('/developers', developersRouter);
routes.use('/levels', levelsRouter);

routes.get('/health-check', (request: Request, response: Response) => {
  response.json({ response: 'Server Online 🚀' });
});

export default routes;
