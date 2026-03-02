import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Appointment } from './interfaces/appointment.interface';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ServicesService } from '../services/services.service';

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[] = [];

  constructor(
    private readonly servicesService: ServicesService,
  ) {}

  create(dto: CreateAppointmentDto): Appointment {
    // ✅ ตรวจว่า service มีอยู่จริง
    this.servicesService.findOne(dto.serviceId);

    const newAppointment: Appointment = {
      id: Date.now(),
      ...dto,
    };

    this.appointments.push(newAppointment);
    return newAppointment;
  }

  findAll(): Appointment[] {
    return this.appointments;
  }

  findOne(id: number): Appointment {
    const appointment = this.appointments.find(a => a.id === id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  update(id: number, dto: CreateAppointmentDto): Appointment {
    const index = this.appointments.findIndex(a => a.id === id);

    if (index === -1) {
      throw new NotFoundException('Appointment not found');
    }

    // ตรวจ serviceId ใหม่ด้วย
    this.servicesService.findOne(dto.serviceId);

    const updated: Appointment = {
      id,
      ...dto,
    };

    this.appointments[index] = updated;
    return updated;
  }

  patch(
    id: number,
    dto: Partial<CreateAppointmentDto>,
  ): Appointment {
    const appointment = this.findOne(id);

    if (dto.serviceId) {
      this.servicesService.findOne(dto.serviceId);
    }

    const updated: Appointment = {
      ...appointment,
      ...dto,
    };

    this.appointments = this.appointments.map(a =>
      a.id === id ? updated : a,
    );

    return updated;
  }

  remove(id: number): void {
    const exists = this.appointments.some(a => a.id === id);

    if (!exists) {
      throw new NotFoundException('Appointment not found');
    }

    this.appointments = this.appointments.filter(
      a => a.id !== id,
    );
  }
}