import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from './../services/data.service';
import { Project } from './../models/project.model';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {

  allProjects: Project[] = [];
  newProjects: Project[] = [];
  newProjectFlag: number = 0;
  activeProjectFlag: boolean = false;
  activeProject: Project;

  newProjectForm;
  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.dataService.fetchProjects()
    .subscribe(
      data => {
        if(data['data']) this.allProjects = data['data'];
        this.allProjects.sort((a, b) => (a.project_name > b.project_name) ? 1 : -1)
        console.log(this.allProjects);
      },
      error => console.log(error)
    );
    this.newProjectForm = new FormGroup({
      'name': new FormControl(),
      'code': new FormControl(),
      'owner': new FormControl(),
      'type': new FormControl()
    });
  }

  ngOnDestroy(){
    // alert('Are you sure?');
  }

  addNewProject(){
    this.newProjectFlag=1;
    console.log(this.allProjects);
  }
  cancelNewProject(){
    this.newProjectFlag = 0;
  }
  onSubmit(){
    const name = this.newProjectForm.value.name;
    const code = this.newProjectForm.value.code;
    const owner = this.newProjectForm.value.owner;
    const type = this.newProjectForm.value.type;

    let project: Project = {
      'project_id': this.allProjects && this.allProjects.length ? Math.max.apply(null, (this.allProjects.map(project => project.project_id))) + 1 : 1,
      'project_name': name,
      'project_code': code,
      'project_type': type,
      'project_owner': owner,
    }
    this.allProjects.push(project);

    this.dataService.updateProjects(this.allProjects);
  }
  
  selectProject(employee){
    this.activeProject = employee;
    this.activeProjectFlag = true;
    console.log(this.activeProject);
    // this.router.navigateByUrl('/home/users/'+this.activeEmployee.employee_id);
  }

}
