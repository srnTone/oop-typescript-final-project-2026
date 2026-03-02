import { Module } from '@nestjs/common';
import { ServicesModule } from './modules/services/services.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';

@Module({
  imports: [ServicesModule, AppointmentsModule],
})
export class AppModule {}