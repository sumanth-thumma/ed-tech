const express = require('express');
const { createCourse, listCourses } = require('../controllers/courseController');
const { auth, authorize } = require('../middlewares/auth');
const { validateRequired } = require('../middlewares/validate');

const router = express.Router();

router.get('/', listCourses);
router.post('/', auth, authorize('instructor', 'admin'), validateRequired(['title', 'description']), createCourse);

module.exports = router;
