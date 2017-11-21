import {Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {VacancyModel} from '../../_models/vacancy.model';
import {VacanciesService} from '../../_services/vacancies.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {AtVacanciesItemComponent} from './at-vacancies-item/at-vacancies-item.component';
import {UserService} from "../../_services/user.service";



@Component({
  selector: 'app-at-vacancies-list',
  templateUrl: './at-vacancies-list.component.html',
  styleUrls: ['./at-vacancies-list.component.css']
})
export class AtVacanciesListComponent implements OnInit, OnDestroy {
  @ViewChildren(AtVacanciesItemComponent) allAtVacanciesItemComponents: QueryList<AtVacanciesItemComponent>;


  options: number[] = [1, 10, 15, 20, 25, 30];
  pages: number[] = [1, 2, 3, 4, 5];
  resultCount = 15;
  page = 1;
  isAdmin: boolean
/*  subscription: Subscription;*/
  private vacancies: VacancyModel[];


  constructor(private vacanciesService: VacanciesService, private userService: UserService) { }

  ngOnInit() {
    this.isAdmin = this.userService.isAdminUser();
    /*this.subscription =*/
    this.vacanciesService.getVacancies();
    this.vacanciesService.vacancyChange.subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
      }
    )
    /*.subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
        console.log(this.vacancies);
      }
    );*/
  }

  ngOnDestroy() {
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

  onEdit() {
      this.allAtVacanciesItemComponents.forEach((atVacanciesItemComponent) => atVacanciesItemComponent.closeEdit());
  }


}
