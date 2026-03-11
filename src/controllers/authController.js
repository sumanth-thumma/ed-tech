const { User } = require('../models');
const { signToken } = require('../utils/jwt');

const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const user = await User.create({ fullName, email, password, role });

  return res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.isValidPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken({ sub: user.id, role: user.role });

  return res.json({
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });
};

module.exports = {
  register,
  login
};
