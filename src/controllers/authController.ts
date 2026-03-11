import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).json({ message: 'Registered', user });
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  res.status(200).json(result);
};

export const me = async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
};
