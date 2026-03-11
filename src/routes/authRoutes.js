const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRequired } = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validateRequired(['fullName', 'email', 'password']), register);
router.post('/login', validateRequired(['email', 'password']), login);

module.exports = router;
