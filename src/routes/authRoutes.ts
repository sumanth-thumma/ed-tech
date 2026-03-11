import { Router } from 'express';
import * as authController from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { loginSchema, registerSchema } from '../validations/authValidation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/register', validateRequest(registerSchema), asyncHandler(authController.register));
router.post('/login', validateRequest(loginSchema), asyncHandler(authController.login));
router.get('/me', protect, asyncHandler(authController.me));

export default router;
