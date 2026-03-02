import { IsString, IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsISO8601()
  appointmentDate!: string;
}