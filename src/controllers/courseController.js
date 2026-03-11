const { Course, User } = require('../models');

const createCourse = async (req, res) => {
  const { title, description } = req.body;
  const course = await Course.create({
    title,
    description,
    instructorId: req.user.id
  });

  return res.status(201).json(course);
};

const listCourses = async (_req, res) => {
  const courses = await Course.findAll({
    include: [
      {
        model: User,
        as: 'instructor',
        attributes: ['id', 'fullName', 'email']
      }
    ]
  });

  return res.json(courses);
};

module.exports = {
  createCourse,
  listCourses
};
