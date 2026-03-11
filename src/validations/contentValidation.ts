import { z } from 'zod';

export const createSectionSchema = z.object({
  body: z.object({
    courseId: z.string().uuid(),
    title: z.string().min(2),
    order: z.number().int().min(1).optional()
  })
});

export const updateSectionSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    order: z.number().int().min(1).optional()
  }),
  params: z.object({ id: z.string().uuid() })
});

export const createLessonSchema = z.object({
  body: z.object({
    sectionId: z.string().uuid(),
    title: z.string().min(2),
    videoUrl: z.string().url().optional(),
    content: z.string().optional(),
    order: z.number().int().min(1).optional(),
    isPreview: z.boolean().optional()
  })
});

export const updateLessonSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    videoUrl: z.string().url().optional(),
    content: z.string().optional(),
    order: z.number().int().min(1).optional(),
    isPreview: z.boolean().optional()
  }),
  params: z.object({ id: z.string().uuid() })
});
