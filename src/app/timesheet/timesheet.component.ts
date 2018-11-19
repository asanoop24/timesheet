import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Task } from './../models/task.model';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor(private dataService: DataService) { }
  allDates: Object;
  currentDates: Object[];
  currentWeek  = 1;
  currentDate: Date;
  currentDateTasks: Task[] = [];
  currentWeekTasks: Task[] = [];

  ngOnInit() {
    this.allDates = this.dataService.allDates;
    this.currentDates = this.allDates[this.currentWeek.toString()];
    this.currentDate = this.currentDates['2'];
    console.log(this.currentDate);
    this.allTasks = this.dataService.fetchTimesheet(1062136);
  }
  
  goToPreviousWeek(){
    this.currentWeek -= 1;
    this.currentDates = this.allDates[this.currentWeek.toString()];
    console.log(this.currentDates);
    
  }
  goToNextWeek(){
    this.currentWeek += 1;
    this.currentDates = this.allDates[this.currentWeek.toString()];
    console.log(this.currentDates);
  }

  addNewTask(){
    let newTask: Task = {
      name: '',
      date: this.currentDate,
      projectName: '',
      timeSpent: 0
    };
    this.currentDateTasks.push(newTask);
    console.log(this.currentDateTasks);
  }

  selectDate(date){
    console.log(date);
    this.currentDate = date;
    this.currentDateTasks = this.currentWeekTasks.filter((task) => task.date == this.currentDate);
  }

  updateTask(task){
    console.log(task);
  }

  onSave(){
    this.currentDateTasks.forEach((task) => {
      if(this.currentWeekTasks.indexOf(task) == -1){
        this.currentWeekTasks.push(task);
      }
    });
    // this.currentWeekTasks.push(this.currentDateTasks);
  }

  onSubmit(){
    this.dataService.submitTimesheet(this.currentWeekTasks);
  }


}
