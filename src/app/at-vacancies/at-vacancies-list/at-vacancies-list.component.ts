import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Vacancy} from '../../models/vacancy.model';
import {VacanciesService} from '../../services/vacancies.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-at-vacancies-list',
  templateUrl: './at-vacancies-list.component.html',
  styleUrls: ['./at-vacancies-list.component.css']
})
export class AtVacanciesListComponent implements OnInit, OnDestroy {
  options: number[] = [1, 10, 15, 20, 25, 30];
  pages: number[] = [1, 2, 3, 4, 5];
  resultCount = 15;
  page = 1;
  subscription: Subscription;
  private vacancies: Vacancy[];



  constructor(private vacanciesService: VacanciesService) { }

  ngOnInit() {
    this.subscription = this.vacanciesService.getVacancies().subscribe(
      (data: Vacancy[]) => {
        this.vacancies = data;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setResultCount(num: number) {
    this.resultCount = num;
  }

  setPage(num: number) {
    this.page = num;
  }

  start() {
    return this.resultCount * this.page - this.resultCount;
  }

  end() {
    return this.resultCount * this.page;
  }


}
