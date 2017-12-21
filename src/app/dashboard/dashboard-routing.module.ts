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
import {RgQualificationsComponent} from "../rg-qualifications/rg-qualifications.component";
import {RgRegionsComponent} from "../rg-regions/rg-regions.component";
import {AtVacanciesMylistComponent} from "../at-vacancies-mylist/at-vacancies-mylist.component";
import {ApplicantOverviewComponent} from "../applicant-overview/applicant-overview.component";
import {AtApplicantWrapperComponent} from "../at-applicant/at-applicant-wrapper/at-applicant-wrapper.component";
import {ApplicantResolver} from "../_services/applicantResolver.service";
import {AtNotificationTemplatesComponent} from "../at-notification-templates/at-notification-templates.component";
import {AtJobApplicationStatusesComponent} from "../at-job-application-statuses/at-job-application-statuses.component";
import {UserResolver} from "../_services/userResolver.service";
import {CompaniesComponent} from "../companies/companies.component";
import {ApplicantVideosComponent} from "../applicant-videos/applicant-videos.component";
import {AtJobApplicationNotificationsComponent} from "../at-job-application-notifications/at-job-application-notifications.component";


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
      { path: 'myList',
        component: AtVacanciesMylistComponent }
      ,
      {
        path: 'skills',
        component: RgSkillsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'qualifications',
        component: RgQualificationsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'announcements',
        component: AtNotificationTemplatesComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'regions',
        component: RgRegionsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { path: 'applicantStatuses',
        component:  AtJobApplicationStatusesComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'applicantOverview/:id',
        component: ApplicantOverviewComponent,
        resolve: {
          applicant: ApplicantResolver
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'applicant',
        component: AtApplicantWrapperComponent,
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
      },
      {
        path: 'companies',
        component: CompaniesComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'applicantVideos',
        component: ApplicantVideosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications/:id',
        component: AtJobApplicationNotificationsComponent,
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
