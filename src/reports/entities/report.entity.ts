import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('WATER_REPORT')
export class ReportEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  severity: string; // low / medium / high

  @Column({ type: 'varchar' })
  reporterPhone: string;

  @Column({ type: 'boolean', default: false })
  isResolved: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}