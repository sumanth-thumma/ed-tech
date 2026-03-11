import { Course, Review, User } from '../models';
import { ApiError } from '../utils/ApiError';

export const addReview = async (userId: string, payload: any) => {
  const course = await Course.findByPk(payload.courseId);
  if (!course) throw new ApiError(404, 'Course not found');

  const [review] = await Review.findOrCreate({
    where: { userId, courseId: payload.courseId },
    defaults: { rating: payload.rating, comment: payload.comment }
  });

  if (!review.isNewRecord) {
    await review.update({ rating: payload.rating, comment: payload.comment });
  }
  return review;
};

export const deleteReview = async (id: string, userId: string, role: string) => {
  const review = await Review.findByPk(id);
  if (!review) throw new ApiError(404, 'Review not found');
  if (role !== 'admin' && review.get('userId') !== userId) throw new ApiError(403, 'Forbidden');
  await review.destroy();
};

export const getCourseReviews = async (courseId: string) => {
  return Review.findAll({ where: { courseId }, include: [{ model: User, as: 'author', attributes: ['id', 'fullName'] }] });
};
