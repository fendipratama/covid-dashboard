import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CovidData, CovidGlobalData } from './model/covid.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(CovidData)
    private covidDataRepository: Repository<CovidData>,
    
    @InjectRepository(CovidGlobalData)
    private covidGlobalDataRepository: Repository<CovidGlobalData>, 
  ) {}

  // Get Covid data for Indonesia from the database
  async getCovidDataIndonesiaFromDB() {
    return this.covidDataRepository.find({
      where: { country: 'Indonesia' },
      // order: { date: 'DESC' },  // Get the most recent entry
    });
  }

  // Get global Covid data from the database
  async getGlobalCovidDataFromDB() {
    return this.covidGlobalDataRepository.find({
      order: { date: 'DESC' },  // Get the most recent entry
    });
  }

  // Check and fetch the latest Covid data (either from DB or API)
  async fetchCovidData() {
    // Check if Indonesia data is in the DB
    let indonesiaData = await this.getCovidDataIndonesiaFromDB();

    // Check if global data is in the DB
    let globalData = await this.getGlobalCovidDataFromDB();

    return {
      indonesiaData,
      globalData,
    };
  }
}
