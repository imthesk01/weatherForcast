import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { constants } from '../constants/constants';
import {  IForecast, IWeatherData } from '../interfaces';
import { ICoordinates } from '../interfaces/coordinates.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  weatherUrl =  'https://api.openweathermap.org/data/2.5/weather'
  forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'
  iconUrl = 'https://openweathermap.org/img/w'

  constructor(private http: HttpClient) { }

  getWeatherApiUrlByCoordinates(coordinates: ICoordinates): Observable<IWeatherData> {
    const { lat, lon } = coordinates;
    const { appid } = constants;
    return this.http.get<IWeatherData>(`${this.weatherUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`)
  }

  getForcastlByCoordinates(coordinates: ICoordinates): Observable<IForecast> {
    const { lat, lon } = coordinates;
    const { appid } = constants;
    return this.http.get<IForecast>(`${this.forecastUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`)
  }


}
