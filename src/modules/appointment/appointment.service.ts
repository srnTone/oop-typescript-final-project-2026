import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FileUtil } from '../../common/utils/file.util'; // ใช้เครื่องมือจัดการไฟล์ส่วนกลาง
import { AppointmentModel } from './interfaces/appointment.interface';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentStatus } from './enums/appointment-status.enum';
import { ServiceModel } from '../service/interfaces/service.interface';

@Injectable()
export class AppointmentService {
  private readonly dbPath = 'data/appointments.json';
  private readonly servicesDbPath = 'data/services.json';

  // ดึงรายการนัดหมายทั้งหมด
  findAll(): AppointmentModel[] {
    return FileUtil.readJsonFile<AppointmentModel[]>(this.dbPath);
  }

  // ค้นหาการนัดหมายด้วย ID, @throws NotFoundException หากไม่พบข้อมูล

  findOne(id: string): AppointmentModel {
    const appointments = this.findAll();
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment) {
      throw new NotFoundException(`ไม่พบข้อมูลการนัดหมายรหัส: ${id}`);
    }
    return appointment;
  }

// สร้างการนัดหมายใหม่
  create(dto: CreateAppointmentDto): AppointmentModel {
    const services = FileUtil.readJsonFile<ServiceModel[]>(this.servicesDbPath);
    const serviceExists = services.some(s => s.id === dto.serviceId);
    
    if (!serviceExists) {
      throw new BadRequestException(`ไม่สามารถจองได้ เนื่องจากไม่พบรหัสบริการ: ${dto.serviceId}`);
    }

    const appointments = this.findAll();
    
    // สร้าง Object ใหม่โดยจัดการเรื่องค่าว่างให้ถูกต้องตามType
    const newAppointment: AppointmentModel = {
      id: Date.now().toString(),
      ...dto,
      notes: dto.notes ?? '', 
      status: dto.status || AppointmentStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);
    FileUtil.writeJsonFile(this.dbPath, appointments);
    return newAppointment;
  }

  // แก้ไขข้อมูลการนัดหมาย
  update(id: string, dto: UpdateAppointmentDto): AppointmentModel {
    const appointments = this.findAll();
    const index = appointments.findIndex((a) => a.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`ไม่สามารถแก้ไขได้ เนื่องจากไม่พบรหัสการนัดหมาย: ${id}`);
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

    const existing = appointments[index];
    const replacedAppointment: AppointmentModel = {
      id: existing.id,
      ...dto,
      notes: dto.notes ?? '',
      status: dto.status || AppointmentStatus.PENDING,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    appointments[index] = replacedAppointment;
    FileUtil.writeJsonFile(this.dbPath, appointments);
    return replacedAppointment;
  }

  // ลบการนัดหมาย
  remove(id: string): void {
    const appointments = this.findAll();
    this.findOne(id); // ตรวจสอบว่ามีข้อมูลก่อนลบ
    
    const filtered = appointments.filter((a) => a.id !== id);
    FileUtil.writeJsonFile(this.dbPath, filtered);
  }
}