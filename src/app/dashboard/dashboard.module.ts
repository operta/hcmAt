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
import {AtVacanciesModule} from "../at-vacancies/at-vacancies.module";

@NgModule({
  declarations: [
    RgSkillsAddComponent,
    RgSkillsComponent,
    SkillGradesComponent,
    SideMenuComponent,
    ApplicantComponent,
    ApplicantsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    DashboardRoutingModule,
    AtVacanciesModule

  ],
  providers: [ SkillsService, SkillGradesService, VacanciesService, RegionsService, WorkPlacesService, ApplicantsService],

})
export class DashboardModule { }
