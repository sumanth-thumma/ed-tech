import { Course, Enrollment, User } from '../models';
import { ApiError } from '../utils/ApiError';

export const getMe = async (userId: string) => {
  const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

export const updateMe = async (userId: string, payload: Partial<{ fullName: string; bio: string; avatar: string }>) => {
  const user = await User.findByPk(userId);
  if (!user) throw new ApiError(404, 'User not found');
  await user.update(payload);
  return { id: user.id, fullName: user.fullName, email: user.email, bio: user.bio, avatar: user.avatar, role: user.role };
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await User.findByPk(userId);
  if (!user) throw new ApiError(404, 'User not found');
  const valid = await user.isValidPassword(currentPassword);
  if (!valid) throw new ApiError(400, 'Current password is incorrect');
  await user.update({ password: newPassword });
  return { message: 'Password updated successfully' };
};

export const myCourses = async (userId: string) => {
  return Enrollment.findAll({ where: { userId }, include: [{ model: Course, as: 'course' }] });
};

export const listUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

export const deleteUser = async (userId: string) => {
  const user = await User.findByPk(userId);
  if (!user) throw new ApiError(404, 'User not found');
  await user.destroy();
};
