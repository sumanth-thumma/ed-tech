import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getMe = async (req: Request, res: Response) => {
  const user = await userService.getMe(req.user!.id);
  res.json(user);
};

export const updateMe = async (req: Request, res: Response) => {
  const user = await userService.updateMe(req.user!.id, req.body);
  res.json(user);
};

export const changePassword = async (req: Request, res: Response) => {
  const result = await userService.changePassword(req.user!.id, req.body.currentPassword, req.body.newPassword);
  res.json(result);
};

export const myCourses = async (req: Request, res: Response) => {
  const courses = await userService.myCourses(req.user!.id);
  res.json(courses);
};

export const listUsers = async (_req: Request, res: Response) => {
  const users = await userService.listUsers();
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
};
