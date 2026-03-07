import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);

  // Setting Global Prefix กรณีเข้าถึงผ่าน /api
  app.setGlobalPrefix('api');

  // Enable Validation Pipe สำหรับตรวจสอบข้อมูล DTO ที่ส่งเข้ามา
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // อนุญาตเฉพาะฟิลด์ที่กำหนดใน DTO
    forbidNonWhitelisted: true, // ปฏิเสธการส่งฟิลด์ที่ไม่ได้กำหนดใน DTO
    transform: true, // แปลงข้อมูลให้ตรงกับประเภทที่กำหนดใน DTO
  }));

  // Setting Swagger API Documentation
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