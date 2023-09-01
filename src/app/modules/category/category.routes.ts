import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { categoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCategory } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(createCategory),
  categoryController.createCategory
);

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getSingleCategory);

router.patch(
  '/:id',
  validateRequest(createCategory),
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.updateCategory
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.deleteCategory
);

export const categoryRoutes = router;
