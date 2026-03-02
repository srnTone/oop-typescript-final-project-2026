import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment-status.enum';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  serviceId!: number;

  @ApiProperty({ example: '2026-03-10T14:00:00.000Z' })
  @IsDateString()
  appointmentTime!: string;

  @ApiProperty({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  status!: AppointmentStatus;
}