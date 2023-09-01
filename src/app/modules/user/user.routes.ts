import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.getUserById);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  userController.updateSingleUser
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser);

export const userRoutes = router;
