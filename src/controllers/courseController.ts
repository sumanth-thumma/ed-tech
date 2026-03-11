import { Request, Response } from 'express';
import * as courseService from '../services/courseService';
import * as reviewService from '../services/reviewService';

export const createCourse = async (req: Request, res: Response) => {
  const course = await courseService.createCourse(req.user!.id, req.body);
  res.status(201).json(course);
};

export const getCourses = async (req: Request, res: Response) => {
  const courses = await courseService.getCourses(req.query);
  res.json(courses);
};

export const getCourseById = async (req: Request, res: Response) => {
  const course = await courseService.getCourseById(req.params.id);
  res.json(course);
};

export const updateCourse = async (req: Request, res: Response) => {
  const course = await courseService.updateCourse(req.params.id, req.user!.id, req.user!.role, req.body);
  res.json(course);
};

export const deleteCourse = async (req: Request, res: Response) => {
  await courseService.deleteCourse(req.params.id, req.user!.id, req.user!.role);
  res.status(204).send();
};

export const instructorCourses = async (req: Request, res: Response) => {
  const courses = await courseService.instructorCourses(req.user!.id);
  res.json(courses);
};

export const instructorDashboard = async (req: Request, res: Response) => {
  const data = await courseService.instructorDashboard(req.user!.id);
  res.json(data);
};

export const getCourseReviews = async (req: Request, res: Response) => {
  const reviews = await reviewService.getCourseReviews(req.params.id);
  res.json(reviews);
};
