import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FileUtil } from '../../common/utils/file.util'; 
import { AppointmentModel } from './interfaces/appointment.interface';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentStatus } from './enums/appointment-status.enum';
import { ServiceModel } from '../service/interfaces/service.interface';


interface OverlapCheckData {
serviceId?: string;
appointmentDate?: string;
startTime?: string;
}

@Injectable()
export class AppointmentService {
  private readonly dbPath = 'data/appointments.json';
  private readonly servicesDbPath = 'data/services.json';
  private timeToMinutes(time: string): number { // แปลงเวลา "HH:mm" เป็นนาทีทั้งหมด
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  findAll(): AppointmentModel[] {
    return FileUtil.readJsonFile<AppointmentModel[]>(this.dbPath);
  }

  findOne(id: string): AppointmentModel {
    const appointments = this.findAll();
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) {
      throw new NotFoundException(`ไม่พบข้อมูลการนัดหมายรหัส: ${id}`);
    }
    return appointment;
  }

  create(dto: CreateAppointmentDto): AppointmentModel {
    const services = FileUtil.readJsonFile<ServiceModel[]>(this.servicesDbPath);
    const targetService = services.find(s => s.id === dto.serviceId);
    
    if (!targetService) {
      throw new BadRequestException(`ไม่สามารถจองได้ เนื่องจากไม่พบรหัสบริการ: ${dto.serviceId}`);
    }

    const newStart = this.timeToMinutes(dto.startTime);
    const newEnd = newStart + targetService.duration;
    const appointments = this.findAll();
    const isOverlapping = appointments.some(app => {
      if (app.appointmentDate !== dto.appointmentDate || app.status === AppointmentStatus.CANCELLED) {
        return false;
      }

      const existingService = services.find(s => s.id === app.serviceId);
      if (!existingService) return false;

      const existingStart = this.timeToMinutes(app.startTime);
      const existingEnd = existingStart + existingService.duration;
      return newStart < existingEnd && newEnd > existingStart;
    });

    if (isOverlapping) {
      throw new BadRequestException('ช่วงเวลาดังกล่าวมีการจองแล้ว กรุณาเลือกเวลาอื่น');
    }

    const newAppointment: AppointmentModel = {
      id: `AP${Date.now().toString().slice(-6)}`,
      ...dto,
      customerPhone: dto.customerPhone,
      notes: dto.notes ?? '', 
      status: dto.status || AppointmentStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);
    FileUtil.writeJsonFile(this.dbPath, appointments);
    return newAppointment;
  }

  update(id: string, dto: UpdateAppointmentDto): AppointmentModel {
    const appointments = this.findAll();
    const index = appointments.findIndex((a) => a.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`ไม่สามารถแก้ไขได้ เนื่องจากไม่พบรหัสการนัดหมาย: ${id}`);
    }

    if (dto.startTime || dto.serviceId || dto.appointmentDate) {
      this.checkOverlap(id, dto, appointments);
    }

    appointments[index] = {
      ...appointments[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    
    FileUtil.writeJsonFile(this.dbPath, appointments);
    return appointments[index];
  }

  replace(id: string, dto: CreateAppointmentDto): AppointmentModel {
    const appointments = this.findAll();
    const index = appointments.findIndex((a) => a.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`ไม่สามารถแทนที่ได้ เนื่องจากไม่พบรหัสการนัดหมาย: ${id}`);
    }

    this.checkOverlap(id, dto, appointments);

    const existing = appointments[index];
    const replacedAppointment: AppointmentModel = {
      id: existing.id,
      ...dto,
      customerPhone: dto.customerPhone,
      notes: dto.notes ?? '',
      status: dto.status || AppointmentStatus.PENDING,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    appointments[index] = replacedAppointment;
    FileUtil.writeJsonFile(this.dbPath, appointments);
    return replacedAppointment;
  }

  private checkOverlap(excludeId: string, dto: OverlapCheckData, allAppointments: AppointmentModel[]) {
  // ดึงข้อมูล service ใช้หา duration
  const currentApp = allAppointments.find(a => a.id === excludeId);

  const services = FileUtil.readJsonFile<ServiceModel[]>(this.servicesDbPath);

  const serviceId = dto.serviceId || currentApp?.serviceId;
  const date = dto.appointmentDate || currentApp?.appointmentDate;
  const startTime = dto.startTime || currentApp?.startTime; 
    if (!startTime || !serviceId) return; // หากไม่มี startTime ให้หยุดทำงานหรือแจ้ง Error เพื่อป้องกันโปรแกรมค้าง

  const targetService = services.find(s => s.id === serviceId);
    if (!targetService) return;

    const start = this.timeToMinutes(startTime);
    const end = start + targetService.duration;
    const overlapping = allAppointments.some(app => {
      if (app.id === excludeId || app.appointmentDate !== date || app.status === AppointmentStatus.CANCELLED) {
        return false;
      }
      const existingService = services.find(s => s.id === app.serviceId);
      if (!existingService) return false;

      const exStart = this.timeToMinutes(app.startTime);
      const exEnd = exStart + existingService.duration;

      return start < exEnd && end > exStart;
    });

    if (overlapping) {
      throw new BadRequestException('ไม่สามารถเปลี่ยนเวลาได้ เนื่องจากทับซ้อนกับรายการอื่น');
    }
  }

  remove(id: string): void {
    const appointments = this.findAll();
    this.findOne(id);
    const filtered = appointments.filter((a) => a.id !== id);
    FileUtil.writeJsonFile(this.dbPath, filtered);
  }
}