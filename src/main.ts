import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

app.enableCors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      origin.startsWith('http://localhost') ||
      origin.includes('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
 await app.listen(process.env.PORT || 3000);
}
bootstrap();
