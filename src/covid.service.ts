import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CovidData, CovidGlobalData } from './model/covid.entity';

@Injectable()
export class CovidService {
  private readonly apiUrl = 'https://covid-api.com/api';

  constructor(
    @InjectRepository(CovidData)
    private covidDataRepository: Repository<CovidData>,

    @InjectRepository(CovidGlobalData)
    private covidGlobalDataRepository: Repository<CovidGlobalData>,
  ) {}

  // Get Covid data from API
  async getCovidDataIndonesia() {
    try {      
      const response = await axios.get(`${this.apiUrl}/reports?country=Indonesia`);
      const data = response.data.data[0]; // Assuming data is an array and we want the first object
      return data;
    } catch (error) {
      console.error('Error fetching COVID data:', error);
      throw new Error('Error fetching data');
    }
  }

  // Save Covid data to the database
  async saveCovidDataIndonesia(covidData: any) {    
    const covid = this.covidDataRepository.create({
      country: 'Indonesia',
      confirmed: covidData.confirmed,
      recovered: covidData.recovered,
      deaths: covidData.deaths,
      date: new Date(),
    });

    await this.covidDataRepository.save(covid);
  }

  async getGlobalCovidData() {    
    const response = await axios.get(`${this.apiUrl}/reports?per_page=10`);
    const resData = response.data.data
    
    const globalData = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
    };
    for (let i = 0; i < resData.length; i++) {      
      globalData.confirmed += resData[i].confirmed;
      globalData.recovered += resData[i].recovered;
      globalData.deaths += resData[i].deaths;
    }

    return globalData
  }

  async saveGlobalCovidData(covidData: any) {    
    const covid = this.covidGlobalDataRepository.create({
      confirmed: covidData.confirmed,
      recovered: covidData.recovered,
      deaths: covidData.deaths,
      date: new Date(),
    });

    await this.covidGlobalDataRepository.save(covid);
  }
  // Get and save Covid data to DB
  async fetchAndSaveCovidData() {
    const data = await this.getCovidDataIndonesia();
    await this.saveCovidDataIndonesia(data);

    const dataGlobal = await this.getGlobalCovidData();
    await this.saveGlobalCovidData(dataGlobal);
  }
}
