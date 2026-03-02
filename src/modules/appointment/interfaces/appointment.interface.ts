import { AppointmentStatus } from '../enums/appointment-status.enum';

export interface AppointmentModel {
  id: string;
  serviceId: string;
  customerName: string;
  appointmentDate: string; // ISO string
  status: AppointmentStatus;
}