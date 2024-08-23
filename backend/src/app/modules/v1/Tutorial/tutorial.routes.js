import { Router } from 'express';
import { upload } from '../../../utils/sendImageToCloudinary.js';
import { TutorialController } from './tutorial.controller.js';
const router = Router();
router.post('/create-category', TutorialController.CreateCategory);
router.get('/get-all-categories', TutorialController.GetAllCategory);
router.post(
  '/create-tutorial',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  TutorialController.CreateTutorial,
);
router.patch(
  '/edit-tutorial/:id',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  TutorialController.EditTutorial,
);
router.get('/', TutorialController.GetAllTutorials);
export const TutorialRoutes = router;
