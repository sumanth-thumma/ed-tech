const sequelize = require('../config/database');

const User = require('./user')(sequelize);
const Course = require('./course')(sequelize);
const Enrollment = require('./enrollment')(sequelize);

User.hasMany(Course, {
  foreignKey: 'instructorId',
  as: 'courses'
});
Course.belongsTo(User, {
  foreignKey: 'instructorId',
  as: 'instructor'
});

User.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'studentId',
  otherKey: 'courseId',
  as: 'enrolledCourses'
});
Course.belongsToMany(User, {
  through: Enrollment,
  foreignKey: 'courseId',
  otherKey: 'studentId',
  as: 'students'
});

Enrollment.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

module.exports = {
  sequelize,
  User,
  Course,
  Enrollment
};
