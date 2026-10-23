import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseInterceptors, 
  UploadedFile, 
  BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { StorageService } from '../storage/storage.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() file: any,
  ) {
    // Validamos que el usuario haya adjuntado la foto obligatoriamente
    if (!file) {
      throw new BadRequestException('La foto del reporte es obligatoria');
    }

    // Subimos la foto a S3 y obtenemos la URL pública
    const photoUrl = await this.storageService.uploadFile(file, 'reports');
    createReportDto.photoUrl = photoUrl;

    // Pasamos el DTO ya con la photoUrl al servicio
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}