import { Router } from 'express';
import * as progressController from '../controllers/progressController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { completeLessonSchema } from '../validations/progressValidation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(protect, restrictTo('student', 'admin'));
router.post('/complete', validateRequest(completeLessonSchema), asyncHandler(progressController.completeLesson));
router.get('/course/:courseId', asyncHandler(progressController.courseProgress));

export default router;
