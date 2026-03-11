import { Request, Response } from 'express';
import * as reviewService from '../services/reviewService';

export const addReview = async (req: Request, res: Response) => {
  const review = await reviewService.addReview(req.user!.id, req.body);
  res.status(201).json(review);
};

export const deleteReview = async (req: Request, res: Response) => {
  await reviewService.deleteReview(req.params.id, req.user!.id, req.user!.role);
  res.status(204).send();
};
