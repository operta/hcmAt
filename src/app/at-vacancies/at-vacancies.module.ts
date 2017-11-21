import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AtVacanciesRoutingModule} from './at-vacancies-routing.module';
import {AtVacanciesComponent} from './at-vacancies.component';
import {AtVacanciesListComponent} from './at-vacancies-list/at-vacancies-list.component';
import { AtVacanciesItemComponent } from './at-vacancies-list/at-vacancies-item/at-vacancies-item.component';
import {SharedModule} from '../_shared/shared.module';
import { AtVacanciesDetailComponent } from './at-vacancies-detail/at-vacancies-detail.component';
import { AtVacanciesEditComponent } from './at-vacancies-edit/at-vacancies-edit.component';
import { AtVacanciesAddComponent } from './at-vacancies-add/at-vacancies-add.component';


@NgModule({
  declarations: [
    AtVacanciesComponent,
    AtVacanciesListComponent,
    AtVacanciesItemComponent,
    AtVacanciesDetailComponent,
    AtVacanciesEditComponent,
    AtVacanciesAddComponent
  ],
  imports: [
    CommonModule,
    AtVacanciesRoutingModule,
    SharedModule
  ]

})
export class AtVacanciesModule { }
