import { Router } from 'express';
import * as courseController from '../controllers/courseController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { createCourseSchema, updateCourseSchema } from '../validations/courseValidation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(courseController.getCourses));
router.get('/:id', asyncHandler(courseController.getCourseById));
router.get('/:id/reviews', asyncHandler(courseController.getCourseReviews));

router.post('/', protect, restrictTo('instructor', 'admin'), validateRequest(createCourseSchema), asyncHandler(courseController.createCourse));
router.put('/:id', protect, restrictTo('instructor', 'admin'), validateRequest(updateCourseSchema), asyncHandler(courseController.updateCourse));
router.delete('/:id', protect, restrictTo('instructor', 'admin'), asyncHandler(courseController.deleteCourse));

export default router;
