import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { environment } from './../../environments/environment';

@Injectable()
export class DataService {
    
    constructor(private http: HttpClient) {}
    // allDates = {
    //     1: ['2018-11-05', '2018-11-06', '2018-11-07', '2018-11-08', '2018-11-09'],
    //     2: ['2018-11-12', '2018-11-13', '2018-11-14', '2018-11-15', '2018-11-16']
    // };
    allDatesString: string[] = ['2018-11-05', '2018-11-06', '2018-11-07', '2018-11-08', '2018-11-09', '2018-11-12', '2018-11-13', '2018-11-14', '2018-11-15', '2018-11-16'];
    nodeApp = environment.nodeApp;
    // nodeApp = 'http://34.93.143.209:3000';

    convertToDate(stringArray){
        let dateArray = [];
        stringArray.forEach((date) => {
            dateArray.push(moment(new Date(date)).format('YYYY-MM-DD'));
        })
        // console.log(dateArray);
        return dateArray;
    }


    login(email, password){
        let url     = `${this.nodeApp}/login`;
        let body    = {
            email: email,
            password: password
        };
        let headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            })
          };
        return this.http.post(url, body, headers);
    }

        
    submitTimesheet(tasks){
        console.log(tasks);
        let url     = `${this.nodeApp}/updateTimesheet`;
        let body    = {
            tasks: tasks
        };
        let headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            })
          };
        return this.http.post(url, body, headers)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }

    fetchTimesheet(employeeId){
        console.log(employeeId);
        const url     = `${this.nodeApp}/fetchTimesheet`;
        const headers = {
            headers: new HttpHeaders({
                'employeeId'  : employeeId.toString()
            })
          };
        return this.http.get<any[]>(url, headers);
    }
    
    fetchDates(){
        const url     = `${this.nodeApp}/fetchDates`;
        const headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            })
          };
        return this.http.get<any[]>(url, headers);
    }

    fetchProjects(){
        const url     = `${this.nodeApp}/fetchProjects`;
        const headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            })
          };
        return this.http.get<any[]>(url, headers);
    }

    fetchEmployees(){
        const url     = `${this.nodeApp}/fetchEmployees`;
        const headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            })
          };
        return this.http.get<any[]>(url, headers);
    }

    updateProjects(projects){
        let url     = `${this.nodeApp}/updateProjects`;
        console.log(projects);
        let body    = {
            projects: projects
        };
        let headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            })
          };
        return this.http.post(url, body, headers)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }

    updateEmployees(employees){
        let url     = `${this.nodeApp}/updateEmployees`;
        console.log(employees);
        let body    = {
            employees: employees
        };
        let headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            })
          };
        return this.http.post(url, body, headers)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }

    fetchReport(employeeId, startDate, endDate){
        console.log(employeeId, startDate, endDate);
        const url     = `${this.nodeApp}/fetchTimesheetByReportees`;
        const headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json',
                'employeeId'  : employeeId.toString(),
                'startDate'  : startDate.toString(),
                'endDate'  : endDate.toString()
            })
          };
        return this.http.get<any[]>(url, headers);
    }

}
