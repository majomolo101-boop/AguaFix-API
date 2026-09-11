import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('SYSTEM_USER')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: true })
  isNotificationEnabled: boolean;
}