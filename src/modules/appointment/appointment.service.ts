import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { AppointmentModel } from './interfaces/appointment.interface';
import { AppointmentStatus } from './enums/appointment-status.enum';
import { FileUtil } from '../../common/utils/file.util';
import { randomUUID } from 'crypto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  private readonly filePath = 'data/appointments.json';

  findAll(): AppointmentModel[] {
    return FileUtil.readJsonFile<AppointmentModel[]>(this.filePath);
  }

  findOne(id: string): AppointmentModel {
    const appointments = this.findAll();
    const found = appointments.find(a => a.id === id);

    if (!found) {
      throw new NotFoundException('Appointment not found');
    }

    return found;
  }

  create(dto: CreateAppointmentDto): AppointmentModel {
    const appointments = this.findAll();

    if (new Date(dto.appointmentDate) < new Date()) {
      throw new BadRequestException('Appointment date must be in the future');
    }

    const newAppointment: AppointmentModel = {
      id: randomUUID(),
      ...dto,
      status: AppointmentStatus.PENDING,
    };

    appointments.push(newAppointment);
    FileUtil.writeJsonFile(this.filePath, appointments);

    return newAppointment;
  }

  update(id: string, dto: UpdateAppointmentDto): AppointmentModel {
    const appointments = this.findAll();
    const index = appointments.findIndex(a => a.id === id);

    if (index === -1) {
      throw new NotFoundException('Appointment not found');
    }

    const updated = { ...appointments[index], ...dto };
    appointments[index] = updated;

    FileUtil.writeJsonFile(this.filePath, appointments);

    return updated;
  }

  remove(id: string): void {
    const appointments = this.findAll();
    const filtered = appointments.filter(a => a.id !== id);

    if (filtered.length === appointments.length) {
      throw new NotFoundException('Appointment not found');
    }

    FileUtil.writeJsonFile(this.filePath, filtered);
  }
}