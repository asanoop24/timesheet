import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ReportsComponent } from './reports/reports.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { SignInComponent } from './sign-in/sign-in.component';

// import { AuthService } from './services/auth.service';

const appRoutes: Routes = [

  
  { path: '', redirectTo:  '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: 'timesheet', component: TimesheetComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'users/:id', component: UsersComponent }
  ] }
//   { path: 'user-dashboard', component: UserDashboardComponent, children:[
//     { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' },
//     { path: 'datasets', component: UserDatasetsComponent, children: [
//       { path: '', redirectTo: 'all', pathMatch: 'full' },
//       { path: 'all', component: UserDataListComponent, pathMatch: 'full' },
//       { path: 'upload', component: UserDataUploadComponent, pathMatch: 'full' },
//       { path: 'preview', component: UserDataPreviewComponent, pathMatch: 'full' },
//       { path: ':id', component: UserDataDetailsComponent, pathMatch: 'full' }
//     ] },
//     { path: 'modules', component: UserModulesComponent },
//     // { path: 'sessions', component:  SessionsComponent }
//   ] },
//   { path: 'superadmin-dashboard', component:  SuperadminDashboardComponent, children:[
//     { path: '', redirectTo:  'superadmin-dashboard', pathMatch: 'full' },
//     { path: 'users', component:  SuperadminUsersComponent }
//     // { path: 'sessions', component:  SessionsComponent }
//   ] }

]

@NgModule({
//   imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}