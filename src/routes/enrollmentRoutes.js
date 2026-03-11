const express = require('express');
const { enroll, myEnrollments } = require('../controllers/enrollmentController');
const { auth, authorize } = require('../middlewares/auth');
const { validateRequired } = require('../middlewares/validate');

const router = express.Router();

router.get('/me', auth, authorize('student', 'admin'), myEnrollments);
router.post('/', auth, authorize('student', 'admin'), validateRequired(['courseId']), enroll);

module.exports = router;
