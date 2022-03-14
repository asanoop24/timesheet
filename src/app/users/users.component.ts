import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Employee } from './../models/employee.model';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';
// import { Router } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  activeEmployeeFlag: boolean = false;
  activeEmployee: Employee;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.dataService.fetchEmployees()
    .subscribe(
      data => {this.allEmployees = data['data'];
      console.log(this.allEmployees);
      this.allEmployees.sort((a, b) => (a.employee_name > b.employee_name) ? 1 : -1);
    },
      error => console.log(error)
    );
  //   this.route.paramMap.subscribe(params => {
  //     let id = params.get('id');
  //     console.log('ssup');
  //     console.log(this.route.snapshot.paramMap.get('id'));      
  //  });
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

  selectEmployee(employee){
    this.activeEmployee = employee;
    this.activeEmployeeFlag = true;
    console.log(this.activeEmployee);
    this.router.navigateByUrl('/home/users/'+this.activeEmployee.employee_id);
  }

  onSubmit(){
    console.log(this.allEmployees);
    this.dataService.updateEmployees(this.allEmployees);
  }

}
