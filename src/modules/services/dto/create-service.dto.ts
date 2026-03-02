import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { ServiceCategory } from '../enums/service-category.enum';

export class CreateServiceDto {
  @ApiProperty({ example: 'Basic Haircut' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(1)
  duration!: number;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ enum: ServiceCategory })
  @IsEnum(ServiceCategory)
  category!: ServiceCategory;
}