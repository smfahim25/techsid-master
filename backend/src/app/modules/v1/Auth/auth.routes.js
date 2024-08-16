import { Router } from 'express';
import { AuthController } from './auth.controller.js';

const router = Router();

router.post('/signup', AuthController.SignUp);

export const AuthRoutes = router;
