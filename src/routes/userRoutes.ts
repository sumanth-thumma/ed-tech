import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { changePasswordSchema, updateProfileSchema } from '../validations/userValidation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(protect);
router.get('/me', asyncHandler(userController.getMe));
router.put('/me', validateRequest(updateProfileSchema), asyncHandler(userController.updateMe));
router.put('/change-password', validateRequest(changePasswordSchema), asyncHandler(userController.changePassword));
router.get('/me/courses', asyncHandler(userController.myCourses));

router.get('/', restrictTo('admin'), asyncHandler(userController.listUsers));
router.delete('/:id', restrictTo('admin'), asyncHandler(userController.deleteUser));

export default router;
