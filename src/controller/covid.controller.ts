import { Controller, Get } from '@nestjs/common';
import { CovidService } from '../covid.service';
import { DashboardService } from '../dashboard.service';

@Controller('covid')
export class CovidController {
  constructor(
    private readonly covidService: CovidService, 
    private readonly dashboardService: DashboardService) {}

  @Get('indonesia')
  async getIndonesiaData() {
    return this.covidService.getCovidDataIndonesia();
  }

  @Get('global')
  async getGlobalData() {
    return this.covidService.getGlobalCovidData();
  }

  @Get('dashboard')
  async getDashboardData() {
    const indonesiaData = await this.dashboardService.getCovidDataIndonesiaFromDB();
    const globalData = await this.dashboardService.getGlobalCovidDataFromDB();
    return {
      indonesiaData,
      globalData,
    };
  }
}
