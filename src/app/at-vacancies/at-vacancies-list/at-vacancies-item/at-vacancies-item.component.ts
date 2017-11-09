import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from '../../../models/vacancy.model';

@Component({
  selector: 'app-at-vacancies-item',
  templateUrl: './at-vacancies-item.component.html',
  styleUrls: ['./at-vacancies-item.component.css']
})
export class AtVacanciesItemComponent implements OnInit {

  @Input() vacancy: Vacancy;

  constructor() { }

  ngOnInit() {
    console.log(this.vacancy);
  }



}
