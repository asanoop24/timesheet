import { ProjectsComponent } from './../projects/projects.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data.service';
import { Task } from './../models/task.model';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
// import {CsvService} from 'angular2-json2csv'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) { }

  report: Task[];
  aggregatedReport:Object[] = [];
  employeeId: number;
  reporteeNames: string[];
  projectNames: string[];
  today: Date = new Date();
  startDate: string = moment(new Date(this.today.getFullYear(), this.today.getMonth(), 1)).format('YYYY-MM-DD');
  endDate: string = moment(new Date()).format('YYYY-MM-DD');
  downloadURL: string;
  safeDownloadURL: SafeResourceUrl;
  
  ngOnInit() {
    this.fetchReport();
    
    // $('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#container');
  }

  fetchReport(){
    this.employeeId = JSON.parse(localStorage.getItem('employee'))['employee_id'];
    this.dataService.fetchReport(this.employeeId, this.startDate, this.endDate)
    .subscribe(
      data => {
        this.report = data['data'];
        this.report = this.report.map(task => {
          task['date'] = moment(task['date']).format('YYYY-MM-DD');
          return task;
        });
        this.reporteeNames = this.report.map((task) => task.employee_name).filter((x, i, a) => a.indexOf(x) == i);
        this.projectNames = this.report.map((task) => task.project_name).filter((x, i, a) => a.indexOf(x) == i);
        this.aggregateReport();
        this.downloadURL = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.report));
        this.safeDownloadURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadURL);
  },
      error => console.log(error)
    );
  }


  aggregateReport(){
    this.aggregatedReport = [];
    this.reporteeNames.forEach((reportee) => {
      this.projectNames.forEach((project) => {
        let sum = 0;
        this.report.filter((task) => task.employee_name == reportee && task.project_name == project).forEach((task) => sum += task['time_spent']);
        this.aggregatedReport.push({'reportee': reportee, 'project': project, 'time_spent': sum});
      })
    });
  }

  onChange(){
    this.fetchReport();
  }

  downloadReport(){
    this.JSONToCSVConvertor(this.report, 'report', 0);
  }

  JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel){
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = ''
    CSV += 'date,employee_id,employee_name,project_id,project_name,task_id,task_name,time_spent' + '\n';
    // CSV += ReportTitle + '\r\n\n';
    if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }

    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }   
    this.downloadURL = 'data:text/json;charset=utf-8,' + encodeURIComponent(CSV);
    this.safeDownloadURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadURL);
  }

}

