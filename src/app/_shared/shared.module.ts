import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ModalComponent} from "./modal.component";


@NgModule({
  declarations: [
    DropdownDirective,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent
  ]
})

export class SharedModule {

}
