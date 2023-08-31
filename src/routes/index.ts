import express, { Router } from 'express';
import { routesMap } from '../interfaces/routesMap';

const router: Router = express.Router();

const moduleRoutes: routesMap[] = [
  // {
  //   path: '/',
  //   // route: ,
  // },
];

moduleRoutes.forEach((route: routesMap): void => {
  router.use(route.path, route.route);
});

export default router;
