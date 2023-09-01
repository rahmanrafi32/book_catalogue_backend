import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { bookController } from './book.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createBook } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(createBook),
  auth(ENUM_USER_ROLE.ADMIN),
  bookController.createNewBook
);
export const booksRoutes = router;
