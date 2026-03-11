import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './env';

export const corsConfig = cors({
  origin: env.corsOrigin === '*' ? true : env.corsOrigin,
  credentials: true
});

export const helmetConfig = helmet();

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false
});
