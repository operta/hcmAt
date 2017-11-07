import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AtVacanciesRoutingModule} from './at-vacancies-routing.module';
import {AtVacanciesComponent} from './at-vacancies.component';
import {AtVacanciesListComponent} from './at-vacancies-list/at-vacancies-list.component';
import { AtVacanciesItemComponent } from './at-vacancies-list/at-vacancies-item/at-vacancies-item.component';
import {SharedModule} from '../shared/shared.module';
import { AtVacanciesDetailComponent } from './at-vacancies-detail/at-vacancies-detail.component';
import { AtVacanciesEditComponent } from './at-vacancies-edit/at-vacancies-edit.component';


@NgModule({
  declarations: [
    AtVacanciesComponent,
    AtVacanciesListComponent,
    AtVacanciesItemComponent,
    AtVacanciesDetailComponent,
    AtVacanciesEditComponent
  ],
  imports: [
    CommonModule,
    AtVacanciesRoutingModule,
    SharedModule
  ]

})
export class AtVacanciesModule { }