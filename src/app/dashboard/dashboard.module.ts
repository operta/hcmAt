import { NgModule } from '@angular/core';
import {RgSkillsComponent} from '../rg-skills/rg-skills.component';
import {SkillGradesComponent} from '../rg-skill-grades/skill-grades.component';
import {SideMenuComponent} from '../ap-side-menu/side-menu.component';
import {ApplicantComponent} from '../at-applicant/applicant.component';
import {ApplicantsComponent} from '../at-applicants/applicants.component';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../_shared/shared.module';
import {WorkPlacesService} from '../_services/work-places.service';
import {RegionsService} from '../_services/regions.service';
import {VacanciesService} from '../_services/vacancies.service';
import {SkillGradesService} from '../rg-skill-grades/skill-grades.service';
import {SkillsService} from '../_services/skills.service';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DataTablesModule} from 'angular-datatables';
import {ApplicantsService} from '../_services/applicants.service';
import {RgSkillsAddComponent} from '../rg-skills/rg-skills-add/rg-skills-add.component';
import {CommonModule} from '@angular/common';
import {AtVacanciesModule} from '../at-vacancies/at-vacancies.module';
import {AtJobApplicationsModule} from '../at-job-applications/at-job-applications.module';
import {QualificationsService} from "../_services/qualifications.service";
import {ApplicantEducationAddComponent} from "../at-applicant/applicant-education-add.component";
import {SchoolsService} from "../_services/schools.service";
import {ApplicantSchoolsService} from "../_services/applicantSchools.service";
import {AtApplicantSchoolsListComponent} from "../at-applicant/at-applicant-schools-list/at-applicant-schools-list.component";
import {AtApplicantSchoolsItemComponent} from "../at-applicant/at-applicant-schools-list/at-applicant-schools-item/at-applicant-schools-item.component";
import {AtApplicantAccomplishmentsComponent} from "../at-applicant/at-applicant-accomplishments/at-applicant-accomplishments.component";
import {AtApplicantAccomplishmentsListComponent} from "../at-applicant/at-applicant-accomplishments/at-applicant-accomplishments-list/at-applicant-accomplishments-list.component";
import {AtApplicantAccomplishmentsItemComponent} from "../at-applicant/at-applicant-accomplishments/at-applicant-accomplishments-item/at-applicant-accomplishments-item.component";
import {AtApplicatAccomplishmentsAddComponent} from "../at-applicant/at-applicant-accomplishments/at-applicat-accomplishments-add/at-applicat-accomplishments-add.component";
import {AccomplishmentTypesService} from "../_services/accomplishmentTypes.service";
import {ApplicantAccomplishmentsService} from "../_services/applicantAccomplishments.service";
import {AccomplishmentTypePipe} from "../at-applicant/at-applicant-accomplishments/accomplishmentType.pipe";

@NgModule({
  declarations: [
    RgSkillsAddComponent,
    RgSkillsComponent,
    SkillGradesComponent,
    SideMenuComponent,
    ApplicantComponent,
    ApplicantsComponent,
    DashboardComponent,
    ApplicantEducationAddComponent,
    AtApplicantSchoolsListComponent,
    AtApplicantSchoolsItemComponent,
    AtApplicantAccomplishmentsComponent,
    AtApplicantAccomplishmentsListComponent,
    AtApplicantAccomplishmentsItemComponent,
    AtApplicatAccomplishmentsAddComponent,
    AccomplishmentTypePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    DashboardRoutingModule,
    AtVacanciesModule,
    AtJobApplicationsModule

  ],
  providers: [
    SkillsService,
    SkillGradesService,
    VacanciesService,
    RegionsService,
    WorkPlacesService,
    ApplicantsService,
    QualificationsService,
    SchoolsService,
    ApplicantSchoolsService,
    AccomplishmentTypesService,
    ApplicantAccomplishmentsService
  ],

})
export class DashboardModule { }
