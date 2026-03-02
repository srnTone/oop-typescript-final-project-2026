import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './interfaces/service.interface';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(
    @Body() dto: CreateServiceDto,
  ): ApiResponse<Service> {
    const service = this.servicesService.create(dto);

    return {
      success: true,
      message: 'Service created successfully',
      data: service,
    };
  }

  @Get()
  findAll(): ApiResponse<Service[]> {
    const services = this.servicesService.findAll();

    return {
      success: true,
      message: 'Services retrieved successfully',
      data: services,
    };
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): ApiResponse<Service> {
    const service = this.servicesService.findOne(id);

    return {
      success: true,
      message: 'Service retrieved successfully',
      data: service,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateServiceDto,
  ): ApiResponse<Service> {
    const updated = this.servicesService.update(id, dto);

    return {
      success: true,
      message: 'Service updated successfully',
      data: updated,
    };
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateServiceDto>,
  ): ApiResponse<Service> {
    const updated = this.servicesService.patch(id, dto);

    return {
      success: true,
      message: 'Service partially updated successfully',
      data: updated,
    };
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): ApiResponse<null> {
    this.servicesService.remove(id);

    return {
      success: true,
      message: 'Service deleted successfully',
      data: null,
    };
  }
}