import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CONFIG from './config';
import { useCors, useValidation, useSwagger, useApiVersioning } from './core/hooks';
import useLogger from './core/hooks/useLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  /** Inject any application level custom hook here */
  useLogger(app);
  useCors(app);
  useValidation(app);
  useApiVersioning(app);
  await useSwagger(app);

  await app.listen(CONFIG.APP.PORT);
}
bootstrap();
