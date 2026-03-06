import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { AppointmentModel } from './interfaces/appointment.interface';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentStatus } from './enums/appointment-status.enum';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  getAll(): ApiResponse<AppointmentModel[]> {
    return {
      success: true,
      message: 'Appointments retrieved successfully',
      data: this.appointmentService.findAll(),
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string): ApiResponse<AppointmentModel | null> {
    const appointment = this.appointmentService.findOne(id);

    return {
      success: true,
      message: 'Appointment retrieved successfully',
      data: appointment ?? null,
    };
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateAppointmentDto): ApiResponse<AppointmentModel> {

    const newAppointment: AppointmentModel = {
      id: Date.now().toString(),
      serviceId: dto.serviceId,
      customerName: dto.customerName,
      appointmentDate: dto.appointmentDate,
      status: AppointmentStatus.PENDING,
    };

    return {
      success: true,
      message: 'Appointment created successfully',
      data: this.appointmentService.create(newAppointment),
    };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAppointmentDto,
  ): ApiResponse<AppointmentModel | null> {

    const updated = this.appointmentService.update(id, dto);

    return {
      success: true,
      message: 'Appointment updated successfully',
      data: updated ?? null,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string): ApiResponse<null> {
    this.appointmentService.remove(id);

    return {
      success: true,
      message: 'Appointment deleted successfully',
      data: null,
    };
  }
}