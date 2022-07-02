import { IMain } from './main.interface';
import { IWeather } from './weather.interface';
import { IWind } from './wind.interface';

export interface IMaster {
  main: IMain[];
  wind: IWind[];
  weather: IWeather[];
  date: Date[];
}
