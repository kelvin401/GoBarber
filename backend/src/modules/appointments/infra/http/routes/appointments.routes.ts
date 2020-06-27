import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

// Application the Middleware
appointmentsRouter.use(ensureAuthenticated);

// Create Appointments
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
