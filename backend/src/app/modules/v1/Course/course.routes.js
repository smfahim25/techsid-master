import { Router } from 'express';
import { upload } from '../../../utils/sendImageToCloudinary.js';
import { CourseController } from './course.controller.js';
const router = Router();
router.post('/create-category', CourseController.CreateCategory);
router.get('/get-all-categories', CourseController.GetAllCategory);
router.post(
  '/create-course',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  CourseController.CreateCourse,
);

export const CourseRoutes = router;
