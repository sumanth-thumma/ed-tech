import { Course, Lesson, Section } from '../models';
import { ApiError } from '../utils/ApiError';

export const createSection = async (payload: any, userId: string, role: string) => {
  const course = await Course.findByPk(payload.courseId);
  if (!course) throw new ApiError(404, 'Course not found');
  if (role !== 'admin' && course.get('instructorId') !== userId) throw new ApiError(403, 'Forbidden');
  return Section.create(payload);
};

export const updateSection = async (id: string, payload: any) => {
  const section = await Section.findByPk(id);
  if (!section) throw new ApiError(404, 'Section not found');
  await section.update(payload);
  return section;
};

export const deleteSection = async (id: string) => {
  const section = await Section.findByPk(id);
  if (!section) throw new ApiError(404, 'Section not found');
  await section.destroy();
};

export const createLesson = async (payload: any) => {
  const section = await Section.findByPk(payload.sectionId);
  if (!section) throw new ApiError(404, 'Section not found');
  return Lesson.create(payload);
};

export const updateLesson = async (id: string, payload: any) => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new ApiError(404, 'Lesson not found');
  await lesson.update(payload);
  return lesson;
};

export const deleteLesson = async (id: string) => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new ApiError(404, 'Lesson not found');
  await lesson.destroy();
};

export const getLesson = async (id: string) => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new ApiError(404, 'Lesson not found');
  return lesson;
};
