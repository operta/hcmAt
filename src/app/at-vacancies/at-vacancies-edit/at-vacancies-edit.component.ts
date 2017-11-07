import {Component, OnDestroy, OnInit} from '@angular/core';
import {Vacancy} from '../vacancy.model';
import {Subscription} from 'rxjs/Subscription';
import {VacanciesService} from '../../services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-at-vacancies-edit',
  templateUrl: './at-vacancies-edit.component.html',
  styleUrls: ['./at-vacancies-edit.component.css']
})
export class AtVacanciesEditComponent implements OnInit, OnDestroy {

  vacancy: Vacancy;
  id: string;
  subscriptionParams: Subscription;
  subscriptionVacancy: Subscription;

  constructor(private vacancyService: VacanciesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptionParams = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
    this.subscriptionVacancy = this.vacancyService.getVacancy(this.id).subscribe(
      (data: Vacancy) => {
        this.vacancy = data;
        console.log(this.vacancy);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionParams.unsubscribe();
    this.subscriptionVacancy.unsubscribe();
  }


}
