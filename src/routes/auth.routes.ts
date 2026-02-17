import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { loginValidation, handleValidationErrors } from '../validators/auth.validator';

const router = Router();
const authController = new AuthController();

router.post('/login', loginValidation, handleValidationErrors, authController.login);

router.post('/refresh', authController.refresh);

router.get('/me', authMiddleware, authController.me);

export default router;
