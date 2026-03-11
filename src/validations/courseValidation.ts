import { z } from 'zod';

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    category: z.string().min(2),
    price: z.number().min(0),
    thumbnail: z.string().url().optional()
  })
});

export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    category: z.string().min(2).optional(),
    price: z.number().min(0).optional(),
    thumbnail: z.string().url().optional(),
    published: z.boolean().optional()
  }),
  params: z.object({ id: z.string().uuid() })
});
