import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AppointmentModel } from './interfaces/appointment.interface';

@Injectable()
export class AppointmentService {
  private filePath = path.join(process.cwd(), 'data/appointments.json');

  private readData(): AppointmentModel[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as AppointmentModel[];
  }

  private writeData(data: AppointmentModel[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  findAll(): AppointmentModel[] {
    return this.readData();
  }

  findOne(id: string): AppointmentModel | undefined {
    const appointments = this.readData();
    return appointments.find((a) => a.id === id);
  }

  create(newAppointment: AppointmentModel): AppointmentModel {
    const appointments = this.readData();
    appointments.push(newAppointment);
    this.writeData(appointments);
    return newAppointment;
  }

  update(id: string, updateData: Partial<AppointmentModel>): AppointmentModel | undefined {
    const appointments = this.readData();
    const index = appointments.findIndex((a) => a.id === id);

    if (index === -1) return undefined;

    appointments[index] = {
      ...appointments[index],
      ...updateData,
    };

    this.writeData(appointments);
    return appointments[index];
  }

  remove(id: string): { deleted: boolean } {
    const appointments = this.readData();
    const newAppointments = appointments.filter((a) => a.id !== id);

    this.writeData(newAppointments);

    return { deleted: true };
  }
}