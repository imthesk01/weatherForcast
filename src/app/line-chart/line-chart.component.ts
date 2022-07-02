import {
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';

import { formatDate } from '@angular/common';
import { IMaster } from '../interfaces/master.interface';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  public lineChartType: ChartType = 'line';
  @Input() weatherData: IMaster;
  @Input() isToday: boolean;
  todayDate = new Date(Date.now());

  constructor(@Inject(LOCALE_ID) private locale: string) {
    Chart.register(Annotation);
  }
  ngOnInit(): void {
    console.log(this.weatherData);
    console.log(this.isToday);
    this.setChartData();
  }

  tempData: number[] = [];
  labelsData: string[] = [];

  setChartData() {
    for (let i = 0; i < this.weatherData.weather.length; i++) {
      if (this.todayDate.getDate() == this.weatherData.date[i].getDate()) {
        this.tempData[i] = this.weatherData.main[i].temp;
        this.labelsData[i] = formatDate(
          this.weatherData.date[i],
          'hh:mm a',
          this.locale
        );
        // console.log(formatDate(this.weatherData.date[i], 'yyyy-MM-dd , hh:mm a', this.locale))
      } else if (!this.isToday) {
        this.tempData[i] = this.weatherData.main[i].temp;
        this.labelsData[i] = formatDate(
          this.weatherData.date[i],
          'MM/dd hh:mm a',
          this.locale
        );
      }
    }
    console.log(this.tempData);
    console.log(this.labelsData);

    this.chart?.update();
  }

  ngOnChanges() {
    console.log(this.isToday);
    this.setChartData();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.tempData, //[29.99, 32.39, 35.5, 35.16, 34.23],
        backgroundColor: 'white',
        borderColor: 'white',
        pointBackgroundColor: 'blue',
        pointBorderColor: 'white',
        // pointHoverBackgroundColor: 'white',
      },
    ],
    labels: this.labelsData, //['6:00 AM', '9:00 AM', '12:00 PM', '3:00 PM', '9:00 PM'],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      x: {
        grid: {
          // color: 'rgba(0, 0, 0, 0)',
          borderColor: 'white',
          borderWidth: 2,
        },
        ticks: {
          color: 'white',
        },
      },
      'y-axis-0': {
        position: 'left',
        grid: {
          // color: 'rgba(0, 0, 0, 0)',
          borderWidth: 2,
          borderColor: 'white',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
