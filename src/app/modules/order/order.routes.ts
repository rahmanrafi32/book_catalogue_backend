import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.CUSTOMER), orderController.createOrder);
export const orderRoutes = router;
