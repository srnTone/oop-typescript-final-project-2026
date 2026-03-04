import { ServiceStatus } from '../../service/enums/service-status.enum';

export interface ServiceModel {
  id: string;               // Identity
  name: string;             // Core Domain
  description: string;      // Core Domain
  price: number;            // Core Domain
  duration: number;         // Core Domain (ระยะเวลาเป็นนาที)
  category: string;         // Core Domain
  status: ServiceStatus;    // Status (ใช้ Enum)
  isActive: boolean;        // Configuration/Flag
  providerName: string;     // Relation (เชิงตรรกะ)
  createdAt: string;        // Timestamp
  updatedAt: string;        // Timestamp
}