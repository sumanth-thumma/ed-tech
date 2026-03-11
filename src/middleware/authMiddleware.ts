import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { ApiError } from '../utils/ApiError';
import { verifyToken } from '../utils/jwt';

export const protect = async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Unauthorized: missing token'));
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  const user = await User.findByPk(decoded.sub);
  if (!user) {
    return next(new ApiError(401, 'Unauthorized: user not found'));
  }

  req.user = user;
  next();
};

export const restrictTo = (...roles: Array<'student' | 'instructor' | 'admin'>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden'));
    }
    next();
  };
};
