import { Router } from 'express';
import { AuthRoutes } from '../../modules/v1/Auth/auth.routes.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
