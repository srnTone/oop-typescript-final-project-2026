import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Fuction เริ่มต้น Entry Point [ ดึงค่าพื้นฐาน NestJS Application ก่อนเริ่ม request]
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Setting Global Prefix กำหนด Prefix หลักสำหรับทุกๆ API Path เป็น /api เพื่อแยกส่วนของ API ออกจากส่วนอื่นๆ
  app.setGlobalPrefix('api');

  // 2. Eanable ValidationPipe ตั้งค่าการตรวจสอบข้อมูล (Global Validation) ช่วยตรวจสอบข้อมูลที่รับเข้ามาผ่าน DTO ให้ถูกต้องตามเงื่อนไขที่กำหนดไว้
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 3. setting Swagger API Documentation แบบ Interface เข้าตรวจสอบได้ผ่าน browser
  const config = new DocumentBuilder()
    .setTitle('Appointment Booking System API')
    .setDescription('The API documentation for the final project')
    .setVersion('1.0')
    .addTag('appointments')
    .addTag('services')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // API Documentation at http://localhost:3000/api/docs

  await app.listen(3000);
}

bootstrap();