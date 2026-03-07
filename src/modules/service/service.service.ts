import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUtil } from '../../common/utils/file.util'; // นำเครื่องมือจัดการไฟล์มาใช้
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceModel } from './interfaces/service.interface';
import { ServiceStatus } from './enums/service-status.enum';

@Injectable()
export class ServiceService {
  // กำหนดเส้นทางไฟล์ข้อมูลที่ใช้เก็บข้อมูลบริการ
  private readonly dbPath = 'data/services.json';

  //* ดึงข้อมูลบริการทั้งหมดที่มีอยู่ในระบบ @returns รายการบริการทั้งหมดในรูปแบบ Array
  findAll(): ServiceModel[] {
    return FileUtil.readJsonFile<ServiceModel[]>(this.dbPath);
  }

  // ค้นหาข้อมูลบริการตาม ID @param id, @throws NotFoundException หากไม่พบข้อมูลในระบบ (ป้องกัน Error 500)
  findOne(id: string): ServiceModel {
    const services = this.findAll();
    const service = services.find((s) => s.id === id);
    
    if (!service) {
      throw new NotFoundException(`ไม่พบรหัสบริการ: ${id}`);
    }
    return service;
  }

  // สร้างข้อมูลบริการใหม่ลงในระบบ @param dto ข้อมูลที่ได้รับมาจากผู้ใช้งานผ่าน API
  create(dto: CreateServiceDto): ServiceModel {
    const services = this.findAll();
    
    // สร้างโครงสร้างข้อมูลใหม่พร้อมกำหนดค่าพื้นฐานและเวลา
    const newService: ServiceModel = {
      id: Date.now().toString(), // ใช้ Time Stamp เป็น ID แบบง่าย
      ...dto,
      status: dto.status || ServiceStatus.AVAILABLE,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    services.push(newService);
    FileUtil.writeJsonFile(this.dbPath, services);
    return newService;
  }

  // อัปเดตข้อมูลบริการที่มีอยู่เดิม @param id รหัสบริการที่ต้องการแก้ไข, @param dto ข้อมูลส่วนที่ต้องการแก้ไข
  update(id: string, dto: UpdateServiceDto): ServiceModel {
    const services = this.findAll();
    const index = services.findIndex((s) => s.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`ไม่สามารถแก้ไขได้ เนื่องจากไม่พบรหัสบริการ: ${id}`);
    }

    // รวมข้อมูลเดิมเข้ากับข้อมูลใหม่ที่ส่งมา พร้อมอัปเดตเวลาแก้ไขล่าสุด
    services[index] = { 
      ...services[index], 
      ...dto, 
      updatedAt: new Date().toISOString() 
    };
    
    FileUtil.writeJsonFile(this.dbPath, services);
    return services[index];
  }

  // ลบข้อมูลบริการออกจากระบบ @param id รหัสบริการที่ต้องการลบ
  remove(id: string): void {
    const services = this.findAll();
    // ตรวจสอบก่อนว่ามีข้อมูลจริงไหมเพื่อความปลอดภัย
    this.findOne(id);
    
    const filtered = services.filter((s) => s.id !== id);
    FileUtil.writeJsonFile(this.dbPath, filtered);
  }
}