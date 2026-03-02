import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './interfaces/service.interface';

@Injectable()
export class ServicesService {
  private services: Service[] = [];

  create(dto: CreateServiceDto): Service {
    const newService: Service = {
      id: Date.now(),
      ...dto,
    };

    this.services.push(newService);
    return newService;
  }

  findAll(): Service[] {
    return this.services;
  }

  findOne(id: number): Service {
    const service = this.services.find(s => s.id === id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return service;
  }

  update(id: number, dto: CreateServiceDto): Service {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) {
      throw new NotFoundException('Service not found');
    }

    const updated: Service = {
      id,
      ...dto,
    };

    this.services[index] = updated;
    return updated;
  }

  patch(id: number, dto: Partial<CreateServiceDto>): Service {
    const service = this.findOne(id);

    const updated: Service = {
      ...service,
      ...dto,
    };

    this.services = this.services.map(s =>
      s.id === id ? updated : s,
    );

    return updated;
  }

  remove(id: number): void {
    const exists = this.services.some(s => s.id === id);
    if (!exists) {
      throw new NotFoundException('Service not found');
    }

    this.services = this.services.filter(s => s.id !== id);
  }
}