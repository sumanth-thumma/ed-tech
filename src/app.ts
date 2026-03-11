import express from 'express';
import path from 'path';
import routes from './routes';
import { corsConfig, helmetConfig, rateLimiter } from './config/security';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app = express();

app.use(helmetConfig);
app.use(corsConfig);
app.use(rateLimiter);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve('src/uploads')));

app.get('/health', (_req, res) => {
  res.status(200).json({ message: 'EdTech API healthy' });
});

app.use('/', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
