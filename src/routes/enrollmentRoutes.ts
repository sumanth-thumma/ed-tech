import { Router } from 'express';
import * as enrollmentController from '../controllers/enrollmentController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { enrollSchema } from '../validations/enrollmentValidation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(protect, restrictTo('student', 'admin'));
router.post('/', validateRequest(enrollSchema), asyncHandler(enrollmentController.enroll));
router.get('/my-courses', asyncHandler(enrollmentController.myCourses));

export default router;
