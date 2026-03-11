import app from './app';
import { env } from './config/env';
import { sequelize } from './models';

const bootstrap = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap server', error);
  process.exit(1);
});
