import express, { Router } from 'express';
import { routesMap } from '../interfaces/routesMap';
import { authRoutes } from '../app/modules/auth/auth.routes';
import { userRoutes } from '../app/modules/user/user.routes';

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
];

moduleRoutes.forEach((route: routesMap): void => {
  router.use(route.path, route.route);
});

export default router;
