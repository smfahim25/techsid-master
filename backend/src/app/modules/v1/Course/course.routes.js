import { Router } from 'express';
import auth from '../../../middlewares/auth.js';
import { upload } from '../../../utils/sendImageToCloudinary.js';
import { CourseController } from './course.controller.js';
const router = Router();
router.post('/create-category', auth('ADMIN'), CourseController.CreateCategory);
router.get(
  '/get-all-categories',
  auth('ADMIN'),
  CourseController.GetAllCategory,
);
router.post(
  '/create-course',
  auth('ADMIN'),
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  CourseController.CreateCourse,
);
router.patch(
  '/edit-course/:id',
  auth('ADMIN'),
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  CourseController.EditCourse,
);
router.get('/', CourseController.GetAllCourses);
export const CourseRoutes = router;
