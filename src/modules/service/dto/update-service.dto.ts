import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

// ข้อกำหนดการรับข้อมูลสำหรับการแก้ไขบริการ สืบทอดคุณสมบัติมาจาก CreateServiceDto แต่ปรับให้ทุกฟิลด์เป็น Optional (เลือกใส่หรือไม่ก็ได้)
export class UpdateServiceDto extends PartialType(CreateServiceDto) {}