import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { environment } from './../../environments/environment';

@Injectable()
export class DataService {
    
    constructor(private http: HttpClient) {}
    allDates = {
        1: ['2018-11-5', '2018-11-6', '2018-11-7', '2018-11-8', '2018-11-9'],
        2: ['2018-11-12', '2018-11-13', '2018-11-14', '2018-11-15', '2018-11-16']
    };
    
    d: Date = new Date();
    getDate(){
        return new Date();
    }
        
    submitTimesheet(tasks){
        console.log(tasks);
        let url     = 'http://localhost:3000/updateTimesheet'
        let body    = {
            tasks: tasks
        };
        let headers = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Accept': 'application/json'
            })
          };
        this.http.post(url, body, headers)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }

    fetchTimesheet(employeeId){
        console.log(employeeId);
        const url     = 'http://localhost:3000/fetchTimesheet'
        const headers = {
            headers: new HttpHeaders({
                'employeeId'  : employeeId.toString()
            })
          };
        return this.http.get(url, headers)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }

}
