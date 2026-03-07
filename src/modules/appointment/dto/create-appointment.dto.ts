import { IsString, IsNotEmpty, IsEnum, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment-status.enum';

// ข้อกำหนดการรับข้อมูลสำหรับการสร้างการจองใหม่
export class CreateAppointmentDto {
  @IsString({ message: 'รหัสบริการต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณาระบุรหัสบริการที่ต้องการจอง' })
  serviceId!: string;

  @IsString({ message: 'ชื่อลูกค้าต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณาระบุชื่อผู้จอง' })
  customerName!: string;

  @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้อง' })
  @IsNotEmpty({ message: 'กรุณาระบุอีเมลติดต่อ' })
  customerEmail!: string;

  @IsPhoneNumber('TH', { message: 'เบอร์โทรศัพท์ต้องเป็นรูปแบบของประเทศไทย' })
  @IsNotEmpty({ message: 'กรุณาระบุเบอร์โทรศัพท์' })
  customerPhone!: string;

  @IsString({ message: 'วันที่นัดหมายต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณาระบุวันที่ต้องการนัดหมาย' })
  appointmentDate!: string;

  @IsString({ message: 'เวลาที่นัดหมายต้องเป็นข้อความ' })
  @IsNotEmpty({ message: 'กรุณาระบุเวลาที่เริ่มนัดหมาย' })
  startTime!: string;

  @IsString({ message: 'หมายเหตุต้องเป็นข้อความ' })
  @IsOptional()
  notes?: string;

  @IsEnum(AppointmentStatus, { message: 'สถานะการจองไม่ถูกต้อง' })
  @IsOptional()
  status?: AppointmentStatus;
}