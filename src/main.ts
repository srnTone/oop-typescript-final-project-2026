import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Setting Global Prefix เข้าถึงผ่าน /api
  app.setGlobalPrefix('api');

  // 2. Eanable ValidationPipe สำหรับการตรวจสอบข้อมูล DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 3. setting Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Appointment Booking System API')
    .setDescription('The API documentation for the final project')
    .setVersion('1.0')
    .addTag('appointments')
    .addTag('services')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // เข้าดูได้ที่ http://localhost:3000/api/docs

  await app.listen(3000);
}

bootstrap();