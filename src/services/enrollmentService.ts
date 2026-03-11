import { Course, Enrollment } from '../models';
import { ApiError } from '../utils/ApiError';

export const enrollCourse = async (userId: string, courseId: string) => {
  const course = await Course.findByPk(courseId);
  if (!course) throw new ApiError(404, 'Course not found');

  const [enrollment] = await Enrollment.findOrCreate({ where: { userId, courseId } });
  return enrollment;
};

export const getMyCourses = async (userId: string) => {
  return Enrollment.findAll({ where: { userId }, include: [{ model: Course, as: 'course' }] });
};
