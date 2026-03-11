const { Enrollment, Course, User } = require('../models');

const enroll = async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findByPk(courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const [enrollment, created] = await Enrollment.findOrCreate({
    where: {
      studentId: req.user.id,
      courseId
    }
  });

  return res.status(created ? 201 : 200).json(enrollment);
};

const myEnrollments = async (req, res) => {
  const enrollments = await Enrollment.findAll({
    where: { studentId: req.user.id },
    include: [
      {
        model: Course,
        as: 'course',
        attributes: ['id', 'title', 'description']
      },
      {
        model: User,
        as: 'student',
        attributes: ['id', 'fullName', 'email']
      }
    ]
  });

  return res.json(enrollments);
};

module.exports = {
  enroll,
  myEnrollments
};
