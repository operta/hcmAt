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
  pages = [{num: 1} , {num: 2}, {num: 3}, {num: 4}, {num: 5}];
  resultCount = 15;
  page = 1;
  subscription: Subscription;
  private vacancies: VacancyModel[];
  isUser = false;
  isAdmin = false;


  constructor(private userService: UserService, private vacanciesService: VacanciesService) { }

  ngOnInit() {
    this.isAdmin = this.userService.isAdmin;
    this.isUser = this.userService.isUser();
    if (this.isAdmin) {
      this.vacanciesService.getVacancies();
      this.subscription = this.vacanciesService.vacancyChange.subscribe(
        (data: VacancyModel[]) => {
          this.vacancies = data;
        }
      );
    }
    if (this.isUser) {
      this.vacanciesService.getActiveVacancies();
      this.subscription = this.vacanciesService.vacancyChange.subscribe(
        (data: VacancyModel[]) => {
          this.vacancies = data;
        }
      );
    }

    /*.subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
        console.log(this.vacancies);
      }
    );*/
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setResultCount(num: number) {
    this.resultCount = num;
  }

  setPage(num: number) {
    this.page = num;

    if (this.page === this.pages[this.pages.length - 1].num) {
      this.pages.forEach(page => page.num = page.num + 2);
      console.log(this.pages);
    }

    if (this.page === this.pages[0].num && this.pages[0].num !== 1) {
      this.pages.forEach(page => page.num = page.num - 2);
    }
/*    if (num === this.pages.length) {
      this.pages.forEach(x => x = x + 2);
    }

    if (num === this.pages[0]) {
      this.pages.forEach(x => x = x - 2);
    }*/
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
