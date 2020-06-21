import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAutheticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const usersController = new UsersController();
const userAvaterController = new UserAvatarController();
const upload = multer(uploadConfig);

// Create User
usersRoutes.post('/', usersController.create);

// Upload Avatar
usersRoutes.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  userAvaterController.update,
);

export default usersRoutes;
