import {Component, Input, OnInit} from '@angular/core';
import {VacancyModel} from '../../../models/vacancy.model';
import {VacanciesService} from "../../../services/vacancies.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-at-vacancies-item',
  templateUrl: './at-vacancies-item.component.html',
  styleUrls: ['./at-vacancies-item.component.css']
})
export class AtVacanciesItemComponent implements OnInit {

  @Input() vacancy: VacancyModel;

  editVacancy: boolean;

  constructor(private vacancyService: VacanciesService, private router: Router) { }

  ngOnInit() {
    this.editVacancy = false;
  }

  editVacancyButton() {
    this.editVacancy = !this.editVacancy;
  }

  vacDetailOpen() {
    this.router.navigate(['vacancies/', this.vacancy.id]);
  }

}
