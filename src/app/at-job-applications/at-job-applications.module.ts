
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AtJobApplicationsComponent} from './at-job-applications.component';
import {AtJobApplicationInterviewsComponent} from './at-job-application-interviews/at-job-application-interviews.component';
import {AtJobApplicationTestsComponent} from './at-job-application-tests/at-job-application-tests.component';
import {SharedModule} from '../_shared/shared.module';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';
import {AtJobApplicationStatusHistoryComponent} from "./at-job-application-status-history/at-job-application-status-history.component";

@NgModule({
  declarations: [
    AtJobApplicationsComponent,
    AtJobApplicationInterviewsComponent,
    AtJobApplicationTestsComponent,
    AtJobApplicationStatusHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class AtJobApplicationsModule {

}
