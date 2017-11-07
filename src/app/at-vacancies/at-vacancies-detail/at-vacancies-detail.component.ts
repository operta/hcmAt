import {Component, OnDestroy, OnInit} from '@angular/core';
import {Vacancy} from '../vacancy.model';
import {VacanciesService} from '../../services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-at-vacancies-detail',
  templateUrl: './at-vacancies-detail.component.html',
  styleUrls: ['./at-vacancies-detail.component.css']
})
export class AtVacanciesDetailComponent implements OnInit, OnDestroy {
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
