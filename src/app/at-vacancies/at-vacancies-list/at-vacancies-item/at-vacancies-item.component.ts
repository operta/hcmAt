import {Component, Input, OnInit} from '@angular/core';
import {VacancyModel} from '../../../models/vacancy.model';

@Component({
  selector: 'app-at-vacancies-item',
  templateUrl: './at-vacancies-item.component.html',
  styleUrls: ['./at-vacancies-item.component.css']
})
export class AtVacanciesItemComponent implements OnInit {

  @Input() vacancy: VacancyModel;

  constructor() { }

  ngOnInit() {
  }



}
