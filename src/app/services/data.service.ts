import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
// import { environment } from './../../environments/environment';

@Injectable()
export class DataService {
    
    constructor(private http: HttpClient) {}
    // allDates = {
    //     1: ['2018-11-05', '2018-11-06', '2018-11-07', '2018-11-08', '2018-11-09'],
    //     2: ['2018-11-12', '2018-11-13', '2018-11-14', '2018-11-15', '2018-11-16']
    // };
    allDatesString: string[] = ['2018-11-05', '2018-11-06', '2018-11-07', '2018-11-08', '2018-11-09', '2018-11-12', '2018-11-13', '2018-11-14', '2018-11-15', '2018-11-16'];

    convertToDate(stringArray){
        let dateArray = [];
        stringArray.forEach((date) => {
            dateArray.push(moment(new Date(date)).format('YYYY-MM-DD'));
        })
        // console.log(dateArray);
        return dateArray;
    }


        
    submitTimesheet(tasks){
        console.log(tasks);
        let url     = 'http://localhost:3000/updateTimesheet';
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
        const url     = 'http://localhost:3000/fetchTimesheet';
        const headers = {
            headers: new HttpHeaders({
                'employeeId'  : employeeId.toString()
            })
          };
        return this.http.get<any[]>(url, headers);
    }
    
    fetchDates(){
        const url     = 'http://localhost:3000/fetchDates';
        const headers = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Accept': 'application/json'
            })
          };
        return this.http.get<any[]>(url, headers);
    }

}
