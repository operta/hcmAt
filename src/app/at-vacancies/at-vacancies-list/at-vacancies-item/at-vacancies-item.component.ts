import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VacancyModel} from '../../../models/vacancy.model';
import {VacanciesService} from "../../../services/vacancies.service";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-at-vacancies-item',
  templateUrl: './at-vacancies-item.component.html',
  styleUrls: ['./at-vacancies-item.component.css']
})
export class AtVacanciesItemComponent implements OnInit {

  @Input() vacancy: VacancyModel;
  editVacancy: boolean;
  isItemHovered: boolean;
  @Output() onEdit = new EventEmitter();


  constructor(private vacancyService: VacanciesService) { }

  ngOnInit() {
    this.isItemHovered = false;
    this.closeEdit();
  }

  editVacancyButton() {
    if(this.editVacancy == true){
      this.onEdit.emit();
    }
    else{
      this.onEdit.emit();
      this.editVacancy = !this.editVacancy
    }


  }

  onUpdate(){
    this.editVacancy = false;
  }

  closeEdit(){
    this.editVacancy = false;
  }

  toggleEditButton(){
      this.isItemHovered = !this.isItemHovered;
  }

}
