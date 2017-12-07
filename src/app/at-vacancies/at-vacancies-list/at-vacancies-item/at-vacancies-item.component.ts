import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VacancyModel} from '../../../_models/vacancy.model';
import {VacanciesService} from '../../../_services/vacancies.service';
import {Router} from '@angular/router';

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


  constructor(private vacancyService: VacanciesService, private router: Router) { }

  ngOnInit() {
    this.isItemHovered = false;
    this.closeEdit();
  }

  editVacancyButton() {
    if (this.editVacancy === true){
      this.onEdit.emit();
    } else {
      this.onEdit.emit();
      this.editVacancy = !this.editVacancy
    }


  }

  onUpdate() {
    this.editVacancy = false;
  }

  closeEdit() {
    this.editVacancy = false;
  }

  toggleEditButton() {
      this.isItemHovered = !this.isItemHovered;
  }

  vacDetailOpen() {
    this.router.navigate(['vacancies/', this.vacancy.id]);
  }

  delete(vacancyName: string) {
    if (confirm('Are you sure to delete ' + vacancyName)) {
      this.vacancyService.deleteVacancy(this.vacancy.id);
      console.log('uslo u delete');
    }
  }

}
