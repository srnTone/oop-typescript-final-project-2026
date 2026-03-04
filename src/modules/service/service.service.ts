import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ServiceService {
  private filePath = path.join(process.cwd(), 'data/services.json');

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
    const services = this.readData();
    return services.find((s: any) => s.id === id);
  }

  create(newService: any) {
    const services = this.readData();
    services.push(newService);
    this.writeData(services);
    return newService;
  }

  update(id: string, updateData: any) {
    const services = this.readData();
    const index = services.findIndex((s: any) => s.id === id);
    services[index] = { ...services[index], ...updateData };
    this.writeData(services);
    return services[index];
  }

  remove(id: string) {
    const services = this.readData();
    const newServices = services.filter((s: any) => s.id !== id);
    this.writeData(newServices);
    return { deleted: true };
  }
}