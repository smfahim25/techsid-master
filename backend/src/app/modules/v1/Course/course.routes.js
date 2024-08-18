import { Router } from 'express';
import { CourseController } from './course.controller.js';

const router = Router();
router.post('/create-category', CourseController.CreateCategory);
router.post('/create-course', CourseController.CreateCourse);

export const CourseRoutes = router;
