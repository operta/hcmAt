import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillsComponent }   from './rg-skills/skills.component';
import { ApplicantComponent } from "./at-applicant/applicant.component";

const routes: Routes = [
  //{ path: '', redirectTo: '/skills', pathMatch: 'full' },
  { path: 'skills',  component: SkillsComponent }, 
  { path: 'applicant', component: ApplicantComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}