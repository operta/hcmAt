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
import {ApplicantEducationAddComponent} from "../at-applicant/at-applicant-schools/applicant-education-add.component";
import {SchoolsService} from "../_services/schools.service";
import {ApplicantSchoolsService} from "../_services/applicantSchools.service";
import {AtApplicantSchoolsListComponent} from "../at-applicant/at-applicant-schools/at-applicant-schools-list/at-applicant-schools-list.component";
import {AtApplicantSchoolsItemComponent} from "../at-applicant/at-applicant-schools/at-applicant-schools-list/at-applicant-schools-item/at-applicant-schools-item.component";
import {AtApplicantAccomplishmentsComponent} from "../at-applicant/at-applicant-accomplishments/at-applicant-accomplishments.component";
import {AtApplicantAccomplishmentsListComponent} from "../at-applicant/at-applicant-accomplishments/at-applicant-accomplishments-list/at-applicant-accomplishments-list.component";
import {AtApplicantAccomplishmentsItemComponent} from "../at-applicant/at-applicant-accomplishments/at-applicant-accomplishments-item/at-applicant-accomplishments-item.component";
import {AtApplicatAccomplishmentsAddComponent} from "../at-applicant/at-applicant-accomplishments/at-applicat-accomplishments-add/at-applicat-accomplishments-add.component";
import {AccomplishmentTypesService} from "../_services/accomplishmentTypes.service";
import {ApplicantAccomplishmentsService} from "../_services/applicantAccomplishments.service";
import {AccomplishmentTypePipe} from "../at-applicant/at-applicant-accomplishments/accomplishmentType.pipe";
import {ProfileComponent} from "../profile/profile.component";
import {AtApplicantExperiencesAddComponent} from "../at-applicant/at-applicant-experiences/at-applicant-experiences-add/at-applicant-experiences-add.component";
import {AtApplicantExperiencesComponent} from "../at-applicant/at-applicant-experiences/at-applicant-experiences.component";
import {AtApplicantExperiencesItemComponent} from "../at-applicant/at-applicant-experiences/at-applicant-experiences-item/at-applicant-experiences-item.component";
import {AtApplicantExperiencesListComponent} from "../at-applicant/at-applicant-experiences/at-applicant-experiences-list/at-applicant-experiences-list.component";
import {ApplicantExperiencesService} from "../_services/applicantExperiences.service";
import {ModalComponent} from "../_shared/modal.component";
import {AtApplicantDocumentsComponent} from "../at-applicant/at-applicant-documents/at-applicant-documents.component";
import {AtApplicantDocumentsListComponent} from "../at-applicant/at-applicant-documents/at-applicant-documents-list/at-applicant-documents-list.component";
import {AtApplicantDocumentsAddComponent} from "../at-applicant/at-applicant-documents/at-applicant-documents-add/at-applicant-documents-add.component";
import {AtApplicantDocumentsItemComponent} from "../at-applicant/at-applicant-documents/at-applicant-documents-item/at-applicant-documents-item.component";
import {AtApplicantContactsComponent} from "../at-applicant/at-applicant-contacts/at-applicant-contacts.component";
import {AtApplicantSkillsComponent} from "../at-applicant/at-applicant-skills/at-applicant-skills.component";
import {AtApplicantContactsListComponent} from "../at-applicant/at-applicant-contacts/at-applicant-contacts-list/at-applicant-contacts-list.component";
import {AtApplicantContactsAddComponent} from "../at-applicant/at-applicant-contacts/at-applicant-contacts-add/at-applicant-contacts-add.component";
import {AtApplicantContactsItemComponent} from "../at-applicant/at-applicant-contacts/at-applicant-contacts-item/at-applicant-contacts-item.component";
import {AtApplicantSkillsListComponent} from "../at-applicant/at-applicant-skills/at-applicant-skills-list/at-applicant-skills-list.component";
import {AtApplicantSkillsAddComponent} from "../at-applicant/at-applicant-skills/at-applicant-skills-add/at-applicant-skills-add.component";
import {AtApplicantSkillsItemComponent} from "../at-applicant/at-applicant-skills/at-applicant-skills-item/at-applicant-skills-item.component";
import {ApplicantContactsService} from "../_services/applicantContacts.service";
import {ApplicantSkillsService} from "../_services/applicantSkills.service";
import {ApplicantDocumentsService} from "../_services/applicantDocuments.service";
import {DocumentTypesService} from "../_services/documentTypes.service";
import {DocumentLinksService} from "../_services/documentLinks.service";
import {ContactTypesService} from "../_services/contactTypes.service";

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
    AtApplicantExperiencesAddComponent,
    AtApplicantExperiencesComponent,
    AtApplicantExperiencesItemComponent,
    AtApplicantExperiencesListComponent,
    AtApplicantDocumentsComponent,
    AtApplicantDocumentsListComponent,
    AtApplicantDocumentsAddComponent,
    AtApplicantDocumentsItemComponent,
    AtApplicantContactsComponent,
    AtApplicantSkillsComponent,
    AtApplicantContactsListComponent,
    AtApplicantContactsAddComponent,
    AtApplicantContactsItemComponent,
    AtApplicantSkillsListComponent,
    AtApplicantSkillsAddComponent,
    AtApplicantSkillsItemComponent,
    AccomplishmentTypePipe,
    ProfileComponent,
    ModalComponent
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
    DocumentTypesService,
    DocumentLinksService,
    ContactTypesService,
    ApplicantSchoolsService,
    AccomplishmentTypesService,
    ApplicantAccomplishmentsService,
    ApplicantExperiencesService,
    ApplicantContactsService,
    ApplicantSkillsService,
    ApplicantDocumentsService
  ],

})
export class DashboardModule { }
