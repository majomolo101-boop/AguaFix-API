import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { EmailModule } from './email/email.module';
import { envs } from './config/envs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,       
      port: envs.DB_PORT,        
      username: envs.DB_USER,     
      password: envs.DB_PASSWORD, 
      database: envs.DB_NAME,   
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    ReportsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}