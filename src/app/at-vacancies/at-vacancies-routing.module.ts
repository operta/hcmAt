import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AtVacanciesComponent} from './at-vacancies.component';
import {AtVacanciesDetailComponent} from './at-vacancies-detail/at-vacancies-detail.component';
import {AtVacanciesListComponent} from './at-vacancies-list/at-vacancies-list.component';
import {AtVacanciesEditComponent} from './at-vacancies-edit/at-vacancies-edit.component';

const recipeRoutes: Routes = [
  { path: '', component: AtVacanciesComponent, children: [
    { path: '', component: AtVacanciesListComponent},
    { path: 'addVacancy', component: AtVacanciesEditComponent },
    { path: 'edit/:id', component: AtVacanciesEditComponent },
    { path: ':id', component: AtVacanciesDetailComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AtVacanciesRoutingModule { }