import { Router } from 'express';
import { UserController } from './user.controller.js';

const router = Router();
router.patch('/edit-user/:id', UserController.EditUser);
router.get('/get-all-users', UserController.GetAllUsers);

export const UserRoutes = router;
