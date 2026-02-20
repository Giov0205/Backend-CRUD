import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

 app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://vercel.com/giovanni-medinas-projects/crud-frontend/2rvfYqAtEFXZMK6qVFtx2ozrMEtX',
  ],
  methods: 'GET,POST,PATCH,DELETE',
  credentials: true,
});

 await app.listen(process.env.PORT || 3000);
}
bootstrap();
