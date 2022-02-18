import { Router, Request, Response } from 'express';

/*
 * Modules Router
 */

import developersRouter from '@modules/developers/infra/http/routes/developers.routes';

const routes = Router();

routes.use('/developers', developersRouter);

routes.get('/health-check', (request: Request, response: Response) => {
  response.json({ response: 'Server Online 🚀' });
});

export default routes;
