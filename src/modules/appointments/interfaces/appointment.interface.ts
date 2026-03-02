import { AppointmentStatus } from '../enums/appointment-status.enum';

export interface Appointment {
  id: number;
  serviceId: number;
  appointmentTime: string;
  status: AppointmentStatus;
}