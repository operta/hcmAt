import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {RgSkillsListComponent} from './rg-skills/rg-skills-list/rg-skillsList.component';
import { ApplicantComponent } from './at-applicant/applicant.component';
import { ApplicantsComponent } from './at-applicants/applicants.component';
import {RgSkillsAddComponent} from './rg-skills/rg-skills-add/rg-skills-add.component';
import {RgSkillsComponent} from './rg-skills/rg-skills.component';

const routes: Routes = [
  // { path: '', redirectTo: '/skills', pathMatch: 'full' },
  { path: 'vacancies', loadChildren: './at-vacancies/at-vacancies.module#AtVacanciesModule'},
  { path: 'skills',  component: RgSkillsComponent, children: [
    {path: 'skillsList', component: RgSkillsListComponent },
    {path: 'addSkill', component: RgSkillsAddComponent}
  ]},
  { path: 'applicant', component: ApplicantComponent },
  { path: 'applicants', component: ApplicantsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
