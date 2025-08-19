import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CovidService } from '../src/covid.service';

@Injectable()
export class BackgroundService {
  constructor(private readonly covidService: CovidService) {}

  // Cron job to fetch and save data every day at midnight
  @Cron('* * * * *') // Run every day at midnight
  async handleCron() {
    console.log('Running scheduled task: Fetching and saving COVID data...');
    await this.covidService.fetchAndSaveCovidData();
  }
}
