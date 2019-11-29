import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Task } from './../models/task.model';
import { Project } from './../models/project.model';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';
import { projection } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private dataService: DataService) { }
  allDates: string[];
  allMonths: number[];
  currentDates: Object[];
  currentWeek  = 1;
  currentDate: string;
  allTasks: Task[] = [];
  currentTasks: Task[] = [];
  currentWeekTasks: Task[] = [];
  value: number = 0;
  taskSummary;
  dateView: boolean = false;
  currentMonth: number;
  currentYear: number;
  employeeId: number;
  employeeName: string;
  today: string;

  allProjects: Project[] = [];

  allCalendarDates;
  currentCalendarDates;
  emptyCalendarDates: string[];

  ngOnInit() {
    this.dataService.fetchProjects()
    .subscribe(
      data => {if(data['data']) this.allProjects = data['data']},
      error => console.log(error)
    );
    this.allDates = this.dataService.convertToDate(this.dataService.allDatesString);
    this.allMonths= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    this.currentDates = this.allDates[this.currentWeek.toString()];
    this.currentDate = moment(new Date()).format('MMMM DD, YYYY');
    this.currentMonth = new Date(moment(this.currentDate).format('YYYY-MM-DD')).getMonth() + 1;
    this.currentYear = moment(this.currentDate).year();

    this.today = moment(new Date()).format('YYYY-MM-DD');
    this.employeeId = JSON.parse(localStorage.getItem('employee'))['employee_id'];
    this.employeeName = JSON.parse(localStorage.getItem('employee'))['employee_name'];
    this.dataService.fetchTimesheet(this.employeeId)
    .subscribe(
      data => {
        this.allTasks = data['data'];
        this.allTasks.forEach((task) => {
          task.date = moment(task.date).format('YYYY-MM-DD');
        });
        this.currentTasks = this.allTasks.filter((task) => task.date == this.currentDate);
      },
      error => console.log(error)
    );
    this.dataService.fetchDates()
    .subscribe(
      data => {
        this.allCalendarDates = data['data'].map((date) => moment(date.date).format('YYYY-MM-DD'));
        this.currentCalendarDates = this.allCalendarDates.filter((date) => new Date(date).getMonth() + 1 == this.currentMonth && new Date(date).getFullYear() == this.currentYear);
        let emptyDates = moment(this.currentCalendarDates[0]).weekday() - 2;
        this.emptyCalendarDates = [];
        for(let i=0;i<=emptyDates;i++){
          this.emptyCalendarDates.push('NA');
        }
      },
      error => console.log(error)
    );


  }
  
  getTotalHoursSpent(tasks: Task[], date){
    tasks = tasks.filter((task) => task.date == date);
    let hours = tasks.map((task) => task.time_spent);
    let total_hours = hours.reduce((a, b) => a + b, 0);
    return total_hours
  }
  getTaskSummary(tasks: Task[]){
    let dates = tasks.map((task) => task.date);
    dates = dates.filter((v, i, a) => a.indexOf(v) === i);
    tasks = _.pick(tasks, ['date', 'time_spent']);
  }

  goToPreviousDate(){
    this.currentDate  = <string>moment(this.currentDate).subtract(1, 'days').format('YYYY-MM-DD');
    this.currentTasks = this.allTasks.filter((task) => task.date == this.currentDate);
    this.currentTasks.forEach(task => task.project_name = this.allProjects.filter(project => project.project_id == task.project_id)[0]['project_name']);
    // this.currentTasks = this.allTasks.filter((task) => task.date == this.currentDate)
    // this.allTasks = this.allTasks.filter((task) => task.date != this.currentDate)
    // console.log(this.allTasks);
  }
  goToNextDate(){
    this.currentDate = <string>moment(this.currentDate).add(1, 'days').format('YYYY-MM-DD');
    this.currentTasks = this.allTasks.filter((task) => task.date == this.currentDate);
    this.currentTasks.forEach(task => task.project_name = this.allProjects.filter(project => project.project_id == task.project_id)[0]['project_name']);
    // this.allTasks = this.allTasks.filter((task) => task.date != this.currentDate)
    // console.log(this.allTasks);
  }

  addNewTask(){
    let newTask: Task = {
      date: this.currentDate,
      employee_id: this.employeeId,
      employee_name: this.employeeName,
      project_id: 1,
      project_name: '',
      task_id: this.currentTasks.length,
      task_name: '',
      time_spent: 0
    };
    // console.log(typeof(this.currentDate));
    // console.log(typeof(moment(this.currentDate).format('YYYY-MM-DD')));
    this.currentTasks.push(newTask);
    // console.log(this.currentDateTasks);
  }

  selectDate(date){
    // console.log(date);
    this.currentDate = date;
    // this.currentDateTasks = this.allTasks.filter((task) => moment(<Date>task.date).format('YYYY-MM-DD') == this.currentDate);
    // console.log(this.currentDateTasks);
  }

  updateTask(task, e){
    this.currentTasks.forEach(task => task.project_id = this.allProjects.map(project => project['project_name']).indexOf(task.project_name)+1);
  }

  onSave(){
    this.currentTasks.forEach((task) => {
      if(this.allTasks.indexOf(task) == -1){
        this.allTasks.push(task);
        // console.log(task.date);
        // task.date = moment(task.date).format('YYYY-MM-DD');
        // console.log(task.date);
      }
    });
    // console.log(this.currentWeekTasks);
  }

  onSubmit(){
    this.allTasks = this.allTasks.filter((task) => task.project_name != '' && task.task_name != '');
    this.dataService.submitTimesheet(this.allTasks);
  }

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
  goToPreviousMonth(){
    this.currentDate  = moment(this.currentDate).subtract(1, 'months').format('YYYY-MM-DD');
    this.currentMonth = parseInt(moment(this.currentDate).format('MM'));
    this.currentCalendarDates = this.allCalendarDates.filter((date) => new Date(date).getMonth()+1 == this.currentMonth);
    let emptyDates = moment(this.currentCalendarDates[0]).weekday() - 2;
    this.emptyCalendarDates = [];
    for(let i=0;i<=emptyDates;i++){
      this.emptyCalendarDates.push('NA');
    }
  }
  goToNextMonth(){
    this.currentDate  = moment(this.currentDate).add(1, 'months').format('YYYY-MM-DD');
    this.currentMonth = parseInt(moment(this.currentDate).format('MM'));
    console.log(this.currentMonth);
    this.currentCalendarDates = this.allCalendarDates.filter((date) => new Date(date).getMonth()+1 == this.currentMonth);
    let emptyDates = moment(this.currentCalendarDates[0]).weekday() - 2;
    this.emptyCalendarDates = [];
    for(let i=0;i<=emptyDates;i++){
      this.emptyCalendarDates.push('NA');
    }
  }
  
  
  dateDrillDown(date){
    this.dateView = true;
    this.currentDate = date;
    this.currentTasks = this.allTasks.filter((task) => task.date == this.currentDate)
    this.currentTasks.forEach(task => task.project_name = this.allProjects.filter(project => project.project_id == task.project_id)[0]['project_name']);
    console.log(this.currentTasks);
  }

}
