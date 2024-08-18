import { Router } from 'express';
import { AuthRoutes } from '../../modules/v1/Auth/auth.routes.js';
import { CourseRoutes } from '../../modules/v1/Course/course.routes.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
