import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// Application the Middleware
appointmentsRouter.use(ensureAuthenticated);

// Create Appointments
appointmentsRouter.post('/', appointmentsController.create);

// List appointments of Providers
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
