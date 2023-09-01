import express, { Router } from 'express';
import { routesMap } from '../interfaces/routesMap';
import { authRoutes } from '../app/modules/auth/auth.routes';

const router: Router = express.Router();

const moduleRoutes: routesMap[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route: routesMap): void => {
  router.use(route.path, route.route);
});

export default router;
