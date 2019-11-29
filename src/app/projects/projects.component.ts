import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Project } from './../models/project.model';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  allProjects: Project[] = [];
  newProjects: Project[] = [];
  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.dataService.fetchProjects()
    .subscribe(
      data => {if(data['data']) this.allProjects = data['data']},
      error => console.log(error)
    );
  }

  addNewProject(){
    let project: Project = {
      'project_id': this.allProjects && this.allProjects.length ? Math.max.apply(null, (this.allProjects.map(project => project.project_id))) + 1 : 1,
      'project_name': ''
    }
    this.allProjects.push(project);
  }

  onSubmit(){
    console.log(this.allProjects);
    this.dataService.updateProjects(this.allProjects);
  }

}
