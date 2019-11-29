import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Employee } from './../models/employee.model';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  employeeId: number = 0;
  employeeName: string = '';
  employeeEmail: string = '';
  employeePassword: string = '';
  allEmployees: Employee[] = [];
  newEmployees: Employee[] = [];
  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.dataService.fetchEmployees()
    .subscribe(
      data => {this.allEmployees = data['data']; console.log(this.allEmployees)},
      error => console.log(error)
    );
  }

  onChange(employee){
    console.log(employee);
  }

  addNewEmployee(){
    let employee: Employee = {
      'employee_id': 0,
      'employee_name': '',
      'employee_email': '',
      'employee_password': 'firstsource',
      'employee_role': 'user',
      'manager_id': parseInt(localStorage.getItem('employee_id')),
      'manager_email': localStorage.getItem('employee_email')
    }
    this.allEmployees.push(employee);
  }

  onSubmit(){
    console.log(this.allEmployees);
    this.dataService.updateEmployees(this.allEmployees);
  }

}
