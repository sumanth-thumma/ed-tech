import { Op } from 'sequelize';
import { Course, Enrollment, Lesson, Review, Section, User } from '../models';
import { ApiError } from '../utils/ApiError';

export const createCourse = async (instructorId: string, payload: any) => {
  return Course.create({ ...payload, instructorId });
};

export const getCourses = async (query: any) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const offset = (page - 1) * limit;
  const where: any = {};

  if (query.search) where.title = { [Op.iLike]: `%${query.search}%` };
  if (query.category) where.category = query.category;
  if (query.published !== undefined) where.published = query.published === 'true';

  const order: any = query.sort === 'rating' ? [['createdAt', 'DESC']] : [['createdAt', 'DESC']];

  return Course.findAndCountAll({
    where,
    include: [
      { model: User, as: 'instructor', attributes: ['id', 'fullName'] },
      { model: Review, as: 'reviews', attributes: ['id', 'rating'] }
    ],
    distinct: true,
    limit,
    offset,
    order
  });
};

export const getCourseById = async (id: string) => {
  const course = await Course.findByPk(id, {
    include: [{ model: Section, as: 'sections', include: ['lessons'] }, { model: Review, as: 'reviews', include: ['author'] }]
  });
  if (!course) throw new ApiError(404, 'Course not found');
  return course;
};

export const updateCourse = async (courseId: string, userId: string, role: string, payload: any) => {
  const course = await Course.findByPk(courseId);
  if (!course) throw new ApiError(404, 'Course not found');
  if (role !== 'admin' && course.get('instructorId') !== userId) throw new ApiError(403, 'Forbidden');
  await course.update(payload);
  return course;
};

export const deleteCourse = async (courseId: string, userId: string, role: string) => {
  const course = await Course.findByPk(courseId);
  if (!course) throw new ApiError(404, 'Course not found');
  if (role !== 'admin' && course.get('instructorId') !== userId) throw new ApiError(403, 'Forbidden');
  await course.destroy();
};

export const instructorCourses = async (instructorId: string) => Course.findAll({ where: { instructorId } });

export const instructorDashboard = async (instructorId: string) => {
  const courses = await Course.findAll({ where: { instructorId }, attributes: ['id'] });
  const courseIds = courses.map((course) => String(course.get('id')));

  if (courseIds.length === 0) {
    return {
      courses: 0,
      students: 0,
      revenue: 0,
      completionRate: 0,
      lessons: 0
    };
  }

  const students = await Enrollment.count({ where: { courseId: { [Op.in]: courseIds } } });
  const sectionIds = (await Section.findAll({ where: { courseId: { [Op.in]: courseIds } }, attributes: ['id'] })).map((s) => String(s.get('id')));
  const lessons = sectionIds.length === 0
    ? 0
    : await Lesson.count({ where: { sectionId: { [Op.in]: sectionIds } } });

  return {
    courses: courses.length,
    students,
    revenue: 0,
    completionRate: 0,
    lessons
  };
};
