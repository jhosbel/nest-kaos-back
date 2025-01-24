/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* app.enableCors({
    origin: '*', // Permitir todas las fuentes, cámbialo según sea necesario
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Accept, Authorization', // Encabezados permitidos
    credentials: true, // Permitir cookies y credenciales
  }); */
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3050);
}
bootstrap();
