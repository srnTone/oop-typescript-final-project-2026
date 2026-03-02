import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceService {
  private services = [
    { id: '1', name: 'Deluxe Room', price: 2000 },
    { id: '2', name: 'Suite Room', price: 3500 },
  ];

  findAll() {
    return this.services;
  }

  findOne(id: string) {
    return this.services.find(service => service.id === id);
  }

  create(data: any) {
    this.services.push(data);
    return data;
  }

  update(id: string, data: any) {
    const index = this.services.findIndex(s => s.id === id);
    this.services[index] = { ...this.services[index], ...data };
    return this.services[index];
  }

  remove(id: string) {
    this.services = this.services.filter(s => s.id !== id);
    return { deleted: true };
  }
}