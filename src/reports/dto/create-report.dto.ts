import { IsString, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(['low', 'medium', 'high'])
  severity: string;

  @IsString()
  @IsNotEmpty()
  reporterPhone: string;

  @IsString()
  @IsOptional()
  photoUrl?: string;
}