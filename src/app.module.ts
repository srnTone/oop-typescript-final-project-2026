import { Module } from '@nestjs/common';
import { ServiceModule } from './modules/service/service.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

/** AppModule: โมดูลหลักของระบบ
   ทำหน้าที่เป็นทางเข้าเริ่มต้นและรวบรวมโมดูลการทำงานทั้งหมด Service และ Appointment */
@Module({
  imports: [
    ServiceModule, // โมดูลจัดการข้อมูลบริการ
    AppointmentModule, // โมดูลจัดการข้อมูลการนัดหมายและตารางการจอง
  ],
})
export class AppModule {}