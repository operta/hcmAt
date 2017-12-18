import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ModalComponent} from "./modal.component";
import {LoaderComponent} from "./loader/loader.component";
import {PaginationService} from "../_services/pagination.service";

@NgModule({
  declarations: [
    DropdownDirective,
    ModalComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent,
    LoaderComponent
  ]
})

export class SharedModule {

}
