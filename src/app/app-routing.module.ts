import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { SkillsComponent } from './rg-skills/skills.component';
import { ApplicantComponent } from './at-applicant/applicant.component';
import { ApplicantsComponent } from './at-applicants/applicants.component';

const routes: Routes = [
  // { path: '', redirectTo: '/skills', pathMatch: 'full' },
  { path: 'vacancies', loadChildren: './at-vacancies/at-vacancies.module#AtVacanciesModule'},
  { path: 'skills',  component: SkillsComponent },
  { path: 'applicant', component: ApplicantComponent },
  { path: 'applicants', component: ApplicantsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
