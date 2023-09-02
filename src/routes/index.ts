import express, { Router } from 'express';
import { routesMap } from '../interfaces/routesMap';
import { authRoutes } from '../app/modules/auth/auth.routes';
import { userRoutes } from '../app/modules/user/user.routes';
import { categoryRoutes } from '../app/modules/category/category.routes';
import { booksRoutes } from '../app/modules/book/book.routes';
import { orderRoutes } from '../app/modules/order/order.routes';
import { profileRoutes } from '../app/modules/profile/profile.routes';

const router: Router = express.Router();

const moduleRoutes: routesMap[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/books',
    route: booksRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
];

moduleRoutes.forEach((route: routesMap): void => {
  router.use(route.path, route.route);
});

export default router;
