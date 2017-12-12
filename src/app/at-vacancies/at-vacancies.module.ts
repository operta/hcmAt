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
import {AtVacanciesDetailItemComponent} from './at-vacancies-detail/at-vacancies-detail-item/at-vacancies-detail-item.component';
import {AtVacanciesDetailUserComponent} from "./at-vacancies-detail/at-vacancies-detail-user/at-vacancies-detail-user.component";
import {AtVacanciesDetailAdminComponent} from "./at-vacancies-detail/at-vacancies-detail-admin/at-vacancies-detail-admin.component";
import {ModalComponent} from "../_shared/modal.component";


@NgModule({
  declarations: [
    AtVacanciesComponent,
    AtVacanciesListComponent,
    AtVacanciesItemComponent,
    AtVacanciesDetailComponent,
    AtVacanciesEditComponent,
    AtVacanciesAddComponent,
    AtVacanciesDetailItemComponent,
    AtVacanciesDetailUserComponent,
    AtVacanciesDetailAdminComponent

  ],
  imports: [
    CommonModule,
    AtVacanciesRoutingModule,
    SharedModule
  ]

})
export class AtVacanciesModule { }
