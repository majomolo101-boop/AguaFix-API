import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportEntity } from './entities/report.entity';
import { EmailModule } from '../email/email.module';
import { StorageService } from '../storage/storage.service'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportEntity]),
    EmailModule,
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService, 
    StorageService, 
  ],
})
export class ReportsModule {}