import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import courseRoutes from './courseRoutes';
import contentRoutes from './contentRoutes';
import enrollmentRoutes from './enrollmentRoutes';
import progressRoutes from './progressRoutes';
import reviewRoutes from './reviewRoutes';
import instructorRoutes from './instructorRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/', contentRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/progress', progressRoutes);
router.use('/reviews', reviewRoutes);
router.use('/instructor', instructorRoutes);
router.use('/upload', uploadRoutes);

export default router;
