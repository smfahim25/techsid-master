import { Router } from 'express';
import auth from '../../../middlewares/auth.js';
import { UserController } from './user.controller.js';
const router = Router();
router.patch('/edit-user/:id', auth('ADMIN'), UserController.EditUser);
router.get('/', auth('ADMIN'), UserController.GetAllUsers);

export const UserRoutes = router;
