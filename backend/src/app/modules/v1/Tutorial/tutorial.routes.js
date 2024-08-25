import { Router } from 'express';
import auth from '../../../middlewares/auth.js';
import { upload } from '../../../utils/sendImageToCloudinary.js';
import { TutorialController } from './tutorial.controller.js';
const router = Router();
router.post(
  '/create-category',
  auth('ADMIN'),
  TutorialController.CreateCategory,
);
router.get(
  '/get-all-categories',
  auth('ADMIN'),
  TutorialController.GetAllCategory,
);
router.post(
  '/create-tutorial',
  upload.single('file'),
  auth('ADMIN'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  TutorialController.CreateTutorial,
);
router.patch(
  '/edit-tutorial/:id',
  auth('ADMIN'),
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  TutorialController.EditTutorial,
);
router.get('/', TutorialController.GetAllTutorials);
export const TutorialRoutes = router;
