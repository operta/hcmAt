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

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    SkillGradesComponent,
    SideMenuComponent,
    ApplicantComponent
  ],
  imports: [
    AppRoutingModule, 
    BrowserModule, 
    DataTablesModule,
    FormsModule,
    HttpModule
  ],
  providers: [ SkillsService, SkillGradesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
