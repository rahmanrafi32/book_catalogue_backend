import config from './config';
import { app } from './app/app';

async function bootstrap(): Promise<void> {
  try {
    app.listen(config.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.log('Failed to connect DB');
  }
}

bootstrap();
