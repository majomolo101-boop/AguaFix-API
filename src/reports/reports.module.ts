import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportEntity } from './entities/report.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportEntity]),
    EmailModule, // <--- Necesario para inyectar EmailService
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}