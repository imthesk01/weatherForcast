import { IWeatherData, ICoordinates } from '.';

export interface ICity {
  coord: ICoordinates;
  id: number;
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IForecast {
  list: IWeatherData[];
  city: ICity;
}
