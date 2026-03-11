import { Router } from 'express';
import * as contentController from '../controllers/contentController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { createLessonSchema, createSectionSchema, updateLessonSchema, updateSectionSchema } from '../validations/contentValidation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/sections', protect, restrictTo('instructor', 'admin'), validateRequest(createSectionSchema), asyncHandler(contentController.createSection));
router.put('/sections/:id', protect, restrictTo('instructor', 'admin'), validateRequest(updateSectionSchema), asyncHandler(contentController.updateSection));
router.delete('/sections/:id', protect, restrictTo('instructor', 'admin'), asyncHandler(contentController.deleteSection));

router.post('/lessons', protect, restrictTo('instructor', 'admin'), validateRequest(createLessonSchema), asyncHandler(contentController.createLesson));
router.put('/lessons/:id', protect, restrictTo('instructor', 'admin'), validateRequest(updateLessonSchema), asyncHandler(contentController.updateLesson));
router.delete('/lessons/:id', protect, restrictTo('instructor', 'admin'), asyncHandler(contentController.deleteLesson));
router.get('/lessons/:id', protect, asyncHandler(contentController.getLesson));

export default router;
