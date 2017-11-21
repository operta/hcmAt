import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillsComponent} from "../rg-skills/skills.component";
import {SkillGradesComponent} from "../rg-skill-grades/skill-grades.component";
import {SideMenuComponent} from "../ap-side-menu/side-menu.component";
import {ApplicantComponent} from "../at-applicant/applicant.component";
import {ApplicantsComponent} from "../at-applicants/applicants.component";
import {DashboardComponent} from "./dashboard.component";
import {AtVacanciesRoutingModule} from "../at-vacancies/at-vacancies-routing.module";
import {SharedModule} from "../_shared/shared.module";
import {WorkPlacesService} from "../_services/work-places.service";
import {RegionsService} from "../_services/regions.service";
import {VacanciesService} from "../_services/vacancies.service";
import {SkillGradesService} from "../rg-skill-grades/skill-grades.service";
import {SkillsService} from "../rg-skills/skills.service";
import {AtVacanciesModule} from "../at-vacancies/at-vacancies.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DataTablesModule} from "angular-datatables";
import {ApplicantsService} from "../_services/applicants.service";

@NgModule({
  declarations: [
    SkillsComponent,
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
    DashboardRoutingModule
  ],
  providers: [ SkillsService, SkillGradesService, VacanciesService, RegionsService, WorkPlacesService, ApplicantsService],

})
export class DashboardModule { }
