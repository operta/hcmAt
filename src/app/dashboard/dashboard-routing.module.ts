import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {RgSkillsComponent} from 'app/rg-skills/rg-skills.component';
import {ApplicantComponent} from '../at-applicant/applicant.component';
import {ApplicantsComponent} from '../at-applicants/applicants.component';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../_services/auth-guard.service';
import {AdminAuthGuard} from '../_services/admin-auth-guard.service';
import {AtJobApplicationsComponent} from '../at-job-applications/at-job-applications.component';
import {AtJobApplicationsAddActivityComponent} from "../at-job-applications/at-job-applications-add-activity/at-job-applications-add-activity.component";
import {ProfileComponent} from "../profile/profile.component";


const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '',
        pathMatch: 'full',
        redirectTo: 'vacancies'
      },
      {
        path: 'jobApplication/:id',
        component: AtJobApplicationsComponent,
        canActivate: [AuthGuard], children: [
          {
            path: 'add',
            component: AtJobApplicationsAddActivityComponent,
            canActivate: [AuthGuard]
          }
      ]
      },
      {
        path: 'vacancies',
        canActivate: [AuthGuard],
        loadChildren: '../at-vacancies/at-vacancies.module#AtVacanciesModule',
      },
      {
        path: 'skills',
        component: RgSkillsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'applicant',
        component: ApplicantComponent,
        canActivate: [AuthGuard]
      },
      { path: 'applicants',
        component: ApplicantsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      }
  ] }
];

@NgModule({
  imports: [ RouterModule.forChild(dashboardRoutes) ],
  exports: [ RouterModule]
})
export class DashboardRoutingModule {
}
