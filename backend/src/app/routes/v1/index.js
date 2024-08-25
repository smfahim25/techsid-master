import { Router } from 'express';
import { AuthRoutes } from '../../modules/v1/Auth/auth.routes.js';
import { CourseRoutes } from '../../modules/v1/Course/course.routes.js';
import { OrdersRoutes } from '../../modules/v1/Order/order.routes.js';
import { TutorialRoutes } from '../../modules/v1/Tutorial/tutorial.routes.js';

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
  {
    path: '/tutorials',
    route: TutorialRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
