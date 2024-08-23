import { Router } from 'express';
import { TutorialController } from './tutorial.controller.js';
const router = Router();
router.post('/create-category', TutorialController.CreateCategory);
router.get('/get-all-categories', TutorialController.GetAllCategory);

export const TutorialRoutes = router;
