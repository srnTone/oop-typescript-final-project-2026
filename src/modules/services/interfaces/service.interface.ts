import { ServiceCategory } from '../enums/service-category.enum';

export interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
  category: ServiceCategory;
}