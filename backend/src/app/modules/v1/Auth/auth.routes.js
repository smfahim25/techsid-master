import { Router } from 'express';
import { AuthController } from './auth.controller.js';

const router = Router();

router.post('/signup', AuthController.SignUp);
router.post('/login', AuthController.Login);
router.post('/social-auth', AuthController.SocialSignUpJWT);

export const AuthRoutes = router;
