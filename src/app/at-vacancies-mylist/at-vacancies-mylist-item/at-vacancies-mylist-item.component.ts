import {Component, Input, OnInit} from '@angular/core';
import {VacancyModel} from "../../_models/vacancy.model";
import {VacanciesService} from "../../_services/vacancies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-at-vacancies-mylist-item',
  templateUrl: './at-vacancies-mylist-item.component.html',
  styleUrls: ['./at-vacancies-mylist-item.component.css']
})
export class AtVacanciesMylistItemComponent implements OnInit {

  @Input() vacancy: VacancyModel;

  constructor(private vacancyService: VacanciesService, private router: Router) { }

  ngOnInit() {
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
