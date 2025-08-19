import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CovidController } from './controller/covid.controller';
import { CovidService } from './covid.service';
import { DashboardService } from './dashboard.service';
import { CovidData, CovidGlobalData } from './model/covid.entity';
import { BackgroundService } from '../background/background';

@Module({
  imports: [
    // ConfigModule for loading environment variables
    ConfigModule.forRoot({
      isGlobal: true,  // Make config available globally
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'CovidDashboard', 
      entities: [CovidData, CovidGlobalData],
      synchronize: true, // Auto synchronize the DB (for development only)
    }),
    TypeOrmModule.forFeature([CovidData, CovidGlobalData]),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public', 'dist'),
    }),
  ],
  controllers: [CovidController],
  providers: [CovidService, DashboardService,BackgroundService],
})
export class AppModule {}
