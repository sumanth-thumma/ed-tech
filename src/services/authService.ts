import { User } from '../models';
import { ApiError } from '../utils/ApiError';
import { signToken } from '../utils/jwt';

export const register = async (payload: { fullName: string; email: string; password: string; role?: 'student' | 'instructor' | 'admin' }) => {
  const exists = await User.findOne({ where: { email: payload.email } });
  if (exists) {
    throw new ApiError(409, 'Email already in use');
  }

  const user = await User.create(payload as any);
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  };
};

export const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ where: { email: payload.email } });
  if (!user || !(await user.isValidPassword(payload.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  return {
    token: signToken({ sub: user.id, role: user.role }),
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  };
};
