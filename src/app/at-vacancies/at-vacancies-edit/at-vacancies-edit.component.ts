import {Component, OnDestroy, OnInit} from '@angular/core';
import {VacancyModel} from '../../models/vacancy.model';
import {Subscription} from 'rxjs/Subscription';
import {VacanciesService} from '../../services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-at-vacancies-edit',
  templateUrl: './at-vacancies-edit.component.html',
  styleUrls: ['./at-vacancies-edit.component.css']
})
export class AtVacanciesEditComponent implements OnInit, OnDestroy {

  vacancy: VacancyModel;
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
      (data: VacancyModel) => {
        this.vacancy = data;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionParams.unsubscribe();
    this.subscriptionVacancy.unsubscribe();
  }


}
