import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsogService } from 'jsog-typescript';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SkillsService } from './_services/skills.service';
import { SkillGradesService } from './rg-skill-grades/skill-grades.service';
import { RgSkillsListComponent} from './rg-skills/rg-skills-list/rg-skillsList.component';
import { SkillGradesComponent } from './rg-skill-grades/skill-grades.component';
import { SideMenuComponent } from './ap-side-menu/side-menu.component';
import { ApplicantComponent } from './at-applicant/applicant.component';
import { ApplicantsComponent } from './at-applicants/applicants.component';
import {AtVacanciesModule} from './at-vacancies/at-vacancies.module';
import {VacanciesService} from './_services/vacancies.service';
import {SharedModule} from './_shared/shared.module';
import {RegionsService} from './_services/regions.service';
import {WorkPlacesService} from './_services/work-places.service';
import { RgSkillsAddComponent } from './rg-skills/rg-skills-add/rg-skills-add.component';
import { RgSkillsComponent } from './rg-skills/rg-skills.component';

@NgModule({
  declarations: [
    AppComponent,
    RgSkillsListComponent,
    SkillGradesComponent,
    SideMenuComponent,
    ApplicantComponent,
    ApplicantsComponent,
    RgSkillsAddComponent,
    RgSkillsComponent
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
  providers: [ SkillsService, SkillGradesService, VacanciesService, RegionsService, WorkPlacesService, JsogService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
