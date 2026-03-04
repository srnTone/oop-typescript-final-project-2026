import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppointmentService {
  private filePath = path.join(process.cwd(), 'data/appointments.json');

  private readData() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private writeData(data: any) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  findAll() {
    return this.readData();
  }

  findOne(id: string) {
    const appointments = this.readData();
    return appointments.find((a: any) => a.id === id);
  }

  create(newAppointment: any) {
    const appointments = this.readData();
    appointments.push(newAppointment);
    this.writeData(appointments);
    return newAppointment;
  }

  update(id: string, updateData: any) {
    const appointments = this.readData();
    const index = appointments.findIndex((a: any) => a.id === id);
    appointments[index] = { ...appointments[index], ...updateData };
    this.writeData(appointments);
    return appointments[index];
  }

  remove(id: string) {
    const appointments = this.readData();
    const newAppointments = appointments.filter((a: any) => a.id !== id);
    this.writeData(newAppointments);
    return { deleted: true };
  }
}