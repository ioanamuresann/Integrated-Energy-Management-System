import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-historical-energy',
  templateUrl: './historical-energy.component.html',
  styleUrls: ['./historical-energy.component.scss']
})
export class HistoricalEnergyComponent implements OnInit {
  selectedDay: Date = new Date();
  energyData: any[] | undefined;
  userLogged = this.userService.getCurrentlyLoggedUser().id;
  currentMonth: string = '';
  public chart: any;

  constructor(private userService: UserService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.selectedDay = new Date(); 
    this.displayHistoricalEnergy(this.userLogged, this.selectedDay.toISOString());
  }

  displayHistoricalEnergy(userId: string, selectedDay: string): void {
    const selectedDayUTC = new Date(selectedDay);
    selectedDayUTC.setMinutes(selectedDayUTC.getMinutes() - selectedDayUTC.getTimezoneOffset());
  
    this.userService.getHistoricalEnergyConsumption(userId, selectedDayUTC.toISOString()).subscribe(
      (data) => {
        this.energyData = data;
        console.log(this.energyData);
        this.createChart();
      },
      (error) => {
        console.error('Error fetching historical energy data:', error);
      }
    );
  }
  

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    if (!this.energyData) {
      console.error('Energy data is undefined.');
      return;
    }
  
    const timeLabels = this.energyData.map(entry => {
      const timestamp = new Date(entry.timestamp);
      const hour = timestamp.getHours().toString().padStart(2, '0');
      const minute = timestamp.getMinutes().toString().padStart(2, '0');
      return `${hour}:${minute}`;
    });
  
    const energyValues = this.energyData.map(entry => entry.measurement_value);
  
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: "Energy Consumption (kWh)",
            data: energyValues,
            backgroundColor: 'pink',
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time of the Day'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Energy Consumption (kWh)'
            },
            max: 80,
          }
        },
        aspectRatio: 0.9,
      }
    });
  }
}
