import { Component, OnInit } from '@angular/core';
import {
  IMain,
  IWeather,
  IWeatherData,
  IWind,
} from './interfaces';
import { ICity, IForecast } from './interfaces/forecast.interface';
import { IMaster } from './interfaces/master.interface';
import { CTodayData } from './interfaces/todayData';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  cityInfo: ICity ;
  tempInfo: CTodayData;
  forcastTempInfo: IMain[] = [];
  forcastWindInfo: IWind[] = [];
  forcastWeatherInfo: IWeather[] = [];
  iconURL: string = 'https://openweathermap.org/img/w/';
  masterData: any;
  dataTime: Date[] = [];
  sunRise: Date;
  sunset: Date;
  isToday: boolean = true;
  coords: { lat: number; lon: number };
  todayDate = new Date(Date.now());
  isLoad = false;
  masterChartData : IMaster = {
    main: [],
    wind: [],
    weather: [],
    date: []
  };

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getCoordinates();
    console.log(this.todayDate)
  }

  getCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.coords = { lat: latitude, lon: longitude };
      this.getCurrentData();
      this.getForcastData();
    });
  }

  getCurrentData() {
    this.appService
      .getWeatherApiUrlByCoordinates(this.coords)
      .subscribe((response: IWeatherData) => {
        this.formatTodayData(response);
      });
  }

  getForcastData() {
    this.appService
      .getForcastlByCoordinates(this.coords)
      .subscribe((response: IForecast) => {
        this.masterData = response.list;
        this.formatForcastData(response.list);
        this.cityInfo = response.city;
        this.sunRise = new Date(this.cityInfo.sunrise * 1000);
        this.sunset = new Date(this.cityInfo.sunset * 1000);
      });
  }

  refreshData(){
    this.getCoordinates();
  }


  formatForcastData(data: IWeatherData[]) {
    data.forEach((element: any) => {
      this.forcastTempInfo.push(element.main);
      this.forcastWindInfo.push(element.wind);
      this.forcastWeatherInfo.push(element.weather[0]);
      this.dataTime.push(new Date(element.dt_txt));
    });

    this.masterChartData.main = this.forcastTempInfo;
    this.masterChartData.weather = this.forcastWeatherInfo;
    this.masterChartData.wind = this.forcastWindInfo;
    this.masterChartData.date = this.dataTime;
    this.isLoad = true;

  }

  formatTodayData(data:IWeatherData){
    let tempData = new CTodayData();
    tempData.temp = data.main.temp;
    tempData.temp_max = data.main.temp_max;
    tempData.temp_min = data.main.temp_min;
    tempData.humidity = data.main.humidity;
    tempData.windSpeed = data.wind.speed;   
    tempData.icon = data.weather[0].icon; 
    tempData.description = data.weather[0].description;
    tempData.dateTime = data.dt;

    this.todayDate = new Date(data.dt * 1000)

    this.tempInfo = tempData;
    // console.log(  new Date(this.tempInfo.dateTime * 1000))
  }


}
