import { Request, Response } from 'express';
import * as progressService from '../services/progressService';

export const completeLesson = async (req: Request, res: Response) => {
  const progress = await progressService.completeLesson(req.user!.id, req.body.lessonId);
  res.status(201).json(progress);
};

export const courseProgress = async (req: Request, res: Response) => {
  const result = await progressService.getCourseProgress(req.user!.id, req.params.courseId);
  res.json(result);
};
