import { Request, Response } from 'express';
import * as enrollmentService from '../services/enrollmentService';

export const enroll = async (req: Request, res: Response) => {
  const enrollment = await enrollmentService.enrollCourse(req.user!.id, req.body.courseId);
  res.status(201).json(enrollment);
};

export const myCourses = async (req: Request, res: Response) => {
  const courses = await enrollmentService.getMyCourses(req.user!.id);
  res.json(courses);
};
