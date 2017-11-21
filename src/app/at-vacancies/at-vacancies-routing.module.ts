import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AtVacanciesComponent} from './at-vacancies.component';
import {AtVacanciesDetailComponent} from './at-vacancies-detail/at-vacancies-detail.component';
import {AtVacanciesListComponent} from './at-vacancies-list/at-vacancies-list.component';
import {AtVacanciesEditComponent} from './at-vacancies-edit/at-vacancies-edit.component';
import {AtVacanciesAddComponent} from './at-vacancies-add/at-vacancies-add.component';
import {AuthGuard} from "../_services/auth-guard.service";
import {AdminAuthGuard} from "../_services/admin-auth-guard.service";

const recipeRoutes: Routes = [
  {
    path: '',
    component: AtVacanciesComponent,
    children: [
      {
        path: 'addVacancy',
        component: AtVacanciesAddComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'edit/:id',
        component: AtVacanciesEditComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: ':id',
        component: AtVacanciesDetailComponent
      }
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
