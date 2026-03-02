import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule], // 👈 ต้องมี
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}