import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './home/menu/menu.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { WorkspaceComponent } from './home/workspace/workspace.component';

import { DataService } from './services/data.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    TimesheetComponent,
    WorkspaceComponent,
    SignInComponent,
    ProjectsComponent,
    ReportsComponent,
    UsersComponent,
    EmployeeProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ChartsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
