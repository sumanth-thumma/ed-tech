import { Router } from 'express';
import * as courseController from '../controllers/courseController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(protect, restrictTo('instructor', 'admin'));
router.get('/courses', asyncHandler(courseController.instructorCourses));
router.get('/dashboard', asyncHandler(courseController.instructorDashboard));

export default router;
