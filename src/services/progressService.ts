import { Course, Enrollment, Lesson, LessonProgress, Section } from '../models';
import { ApiError } from '../utils/ApiError';

export const completeLesson = async (userId: string, lessonId: string) => {
  const lesson = await Lesson.findByPk(lessonId, { include: [{ model: Section, as: 'section' }] });
  if (!lesson) throw new ApiError(404, 'Lesson not found');

  const section = lesson.get('section') as any;
  const courseId = section?.courseId;
  const enrollment = await Enrollment.findOne({ where: { userId, courseId } });
  if (!enrollment) throw new ApiError(403, 'Enroll in course first');

  const [progress] = await LessonProgress.findOrCreate({ where: { userId, lessonId }, defaults: { completed: true } });
  if (!progress.get('completed')) await progress.update({ completed: true });
  return progress;
};

export const getCourseProgress = async (userId: string, courseId: string) => {
  const sections = await Section.findAll({ where: { courseId }, include: [{ model: Lesson, as: 'lessons' }] });
  const lessonIds = sections.flatMap((section: any) => (section.lessons || []).map((lesson: any) => lesson.id));

  const completedLessons = await LessonProgress.count({ where: { userId, lessonId: lessonIds, completed: true } });
  const totalLessons = lessonIds.length;
  const progress = totalLessons === 0 ? 0 : Number(((completedLessons / totalLessons) * 100).toFixed(2));

  return { totalLessons, completedLessons, progress };
};
