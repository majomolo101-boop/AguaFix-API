import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { EmailService } from '../email/email.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
    private readonly emailService: EmailService,
  ) {}

  async create(createReportDto: CreateReportDto) {
    // 1. Guardar el reporte en la base de datos (el DTO ya trae el photoUrl del controlador)
    const report = this.reportRepository.create(createReportDto);
    const savedReport = await this.reportRepository.save(report);

    // 2. Generar el contenido HTML del correo (recibe el DTO que ya incluye la foto)
    const htmlContent = generateReportTemplate(createReportDto);

    // 3. Enviar el correo electrónico
    await this.emailService.sendEmail(
      envs.MAILER_USER, 
      `Nuevo Reporte de Fuga - Severidad: ${createReportDto.severity.toUpperCase()}`,
      htmlContent,
    );

    return savedReport;
  }

  async findAll() {
    return await this.reportRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}