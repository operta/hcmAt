import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SkillsService } from './rg-skills/skills.service';
import { SkillGradesService } from './rg-skill-grades/skill-grades.service';
import { SkillsComponent } from './rg-skills/skills.component';
import { SkillGradesComponent } from './rg-skill-grades/skill-grades.component';
import { SideMenuComponent } from './ap-side-menu/side-menu.component';
import { ApplicantComponent } from './at-applicant/applicant.component';
import { ApplicantsComponent } from './at-applicants/applicants.component';
import {AtVacanciesModule} from './at-vacancies/at-vacancies.module';
import {VacanciesService} from './services/vacancies.service';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    SkillGradesComponent,
    SideMenuComponent,
    ApplicantComponent,
    ApplicantsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DataTablesModule,
    FormsModule,
    HttpModule,
    AtVacanciesModule,
    SharedModule
  ],
  providers: [ SkillsService, SkillGradesService, VacanciesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
