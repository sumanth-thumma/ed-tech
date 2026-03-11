import { Request, Response } from 'express';
import * as contentService from '../services/contentService';

export const createSection = async (req: Request, res: Response) => {
  const section = await contentService.createSection(req.body, req.user!.id, req.user!.role);
  res.status(201).json(section);
};

export const updateSection = async (req: Request, res: Response) => {
  const section = await contentService.updateSection(req.params.id, req.body);
  res.json(section);
};

export const deleteSection = async (req: Request, res: Response) => {
  await contentService.deleteSection(req.params.id);
  res.status(204).send();
};

export const createLesson = async (req: Request, res: Response) => {
  const lesson = await contentService.createLesson(req.body);
  res.status(201).json(lesson);
};

export const updateLesson = async (req: Request, res: Response) => {
  const lesson = await contentService.updateLesson(req.params.id, req.body);
  res.json(lesson);
};

export const deleteLesson = async (req: Request, res: Response) => {
  await contentService.deleteLesson(req.params.id);
  res.status(204).send();
};

export const getLesson = async (req: Request, res: Response) => {
  const lesson = await contentService.getLesson(req.params.id);
  res.json(lesson);
};
