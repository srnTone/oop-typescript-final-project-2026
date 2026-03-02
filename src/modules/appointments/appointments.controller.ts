import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './interfaces/appointment.interface';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateAppointmentDto,
  ): ApiResponse<Appointment> {
    const appointment =
      this.appointmentsService.create(dto);

    return {
      success: true,
      message: 'Appointment created successfully',
      data: appointment,
    };
  }

  @Get()
  findAll(): ApiResponse<Appointment[]> {
    const appointments =
      this.appointmentsService.findAll();

    return {
      success: true,
      message: 'Appointments retrieved successfully',
      data: appointments,
    };
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): ApiResponse<Appointment> {
    const appointment =
      this.appointmentsService.findOne(id);

    return {
      success: true,
      message: 'Appointment retrieved successfully',
      data: appointment,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAppointmentDto,
  ): ApiResponse<Appointment> {
    const updated =
      this.appointmentsService.update(id, dto);

    return {
      success: true,
      message: 'Appointment updated successfully',
      data: updated,
    };
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateAppointmentDto>,
  ): ApiResponse<Appointment> {
    const updated =
      this.appointmentsService.patch(id, dto);

    return {
      success: true,
      message:
        'Appointment partially updated successfully',
      data: updated,
    };
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): ApiResponse<null> {
    this.appointmentsService.remove(id);

    return {
      success: true,
      message: 'Appointment deleted successfully',
      data: null,
    };
  }
}