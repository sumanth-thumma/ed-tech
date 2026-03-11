import { sequelize } from '../config/database';
import { User } from './User';
import { Course } from './Course';
import { Section } from './Section';
import { Lesson } from './Lesson';
import { Enrollment } from './Enrollment';
import { LessonProgress } from './LessonProgress';
import { Review } from './Review';

User.hasMany(Course, { foreignKey: 'instructorId', as: 'createdCourses' });
Course.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

Course.hasMany(Section, { foreignKey: 'courseId', as: 'sections', onDelete: 'CASCADE' });
Section.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Section.hasMany(Lesson, { foreignKey: 'sectionId', as: 'lessons', onDelete: 'CASCADE' });
Lesson.belongsTo(Section, { foreignKey: 'sectionId', as: 'section' });

User.belongsToMany(Course, { through: Enrollment, foreignKey: 'userId', otherKey: 'courseId', as: 'enrolledCourses' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'courseId', otherKey: 'userId', as: 'students' });
Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'student' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

User.hasMany(LessonProgress, { foreignKey: 'userId', as: 'progress' });
LessonProgress.belongsTo(User, { foreignKey: 'userId', as: 'student' });
Lesson.hasMany(LessonProgress, { foreignKey: 'lessonId', as: 'progressRecords' });
LessonProgress.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Course.hasMany(Review, { foreignKey: 'courseId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Review.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

export { sequelize, User, Course, Section, Lesson, Enrollment, LessonProgress, Review };
