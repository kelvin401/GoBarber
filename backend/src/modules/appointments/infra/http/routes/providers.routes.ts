import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

// Application the Middleware
providersRouter.use(ensureAuthenticated);

// List Providers
providersRouter.get('/', providersController.index);

export default providersRouter;
