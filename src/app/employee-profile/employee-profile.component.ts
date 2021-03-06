import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { Label } from 'ng2-charts';
import { DataService } from './../services/data.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private dataService: DataService) {
    Object.assign(this, { single })
  }
  
  employeeId: number;
  numProjects: number;
  totalHours: number;
  hoursPerWeek: number;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.employeeId = parseInt(params.get('id'));
      console.log(this.route.snapshot.paramMap.get('id'));      
      this.dataService.fetchTimesheet(this.employeeId)
      .subscribe(
        data => {
          let allTasks = data['data'];
          
          let allProjects = allTasks.map(task => task.project_name);
          let uniqueProjects = new Set(allProjects);
          this.numProjects = uniqueProjects.size;

          this.totalHours = allTasks.map(task => task.time_spent).reduce((a, b) => a + b, 0);
          
          let allDates = allTasks.map(task => task.date);
          let uniqueDates = new Set(allDates);
          this.hoursPerWeek = uniqueDates.size/7;

        },
        error => console.log(error)
      );

    });



  }

  single: any[];
  multi: any[];

  view: any[] = [700, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Project';
  showYAxisLabel = true;
  yAxisLabel = 'Utilization (Hours)';
  barPadding: number = 50;
  showGridLines: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(event) {
    console.log(event);
  }

}
