import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';
import { protect, restrictTo } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { createReviewSchema } from '../validations/reviewValidation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/', protect, restrictTo('student', 'admin'), validateRequest(createReviewSchema), asyncHandler(reviewController.addReview));
router.delete('/:id', protect, asyncHandler(reviewController.deleteReview));

export default router;
