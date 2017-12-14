import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VacancyModel} from '../../_models/vacancy.model';
import {VacanciesService} from '../../_services/vacancies.service';
import {Subscription} from 'rxjs/Subscription';
import {AtVacanciesItemComponent} from './at-vacancies-item/at-vacancies-item.component';
import {UserService} from "../../_services/user.service";
import {RegionModel} from "../../_models/region.model";
import {WorkPlaceModel} from "../../_models/workPlace.model";
import {RegionsService} from "../../_services/regions.service";
import {WorkPlacesService} from "../../_services/work-places.service";
import {Subject} from "rxjs/Subject";


@Component({
  selector: 'app-at-vacancies-list',
  templateUrl: './at-vacancies-list.component.html',
  styleUrls: ['./at-vacancies-list.component.css']
})
export class AtVacanciesListComponent implements OnInit, OnDestroy {
  @ViewChildren(AtVacanciesItemComponent) allAtVacanciesItemComponents: QueryList<AtVacanciesItemComponent>;
  options: number[] = [1, 10, 15, 20, 25, 30];
/*  pages = [{num: 1} , {num: 2}, {num: 3}, {num: 4}, {num: 5}];*/
  pages = [];
  resultCount = 15;
  page = 1;
  vacancies: VacancyModel[];
  regions: RegionModel[];
  workplaces: WorkPlaceModel[];
  isUser = false;
  isAdmin = false;
  isCompany = false;
  subscription: Subscription;
  subscriptionRegions: Subscription;
  subscriptionWorkplaces: Subscription;
  loading: boolean = false;
  searchValue: string = '';
  searchByStatus: string = '';
  searchByWorkplace: string = '';
  searchByRegion: string = '';
  searchByDateFrom: Date = null;
  searchByDateTo: Date = null;
  searchableList: string[];

  constructor(private userService: UserService,
              private vacanciesService: VacanciesService,
              private regionsService: RegionsService,
              private workplacesService: WorkPlacesService) { }

  ngOnInit() {
    this.searchableList = ['name','description', 'code'];
    this.isAdmin = this.userService.isAdmin;
    this.isCompany = this.userService.isAdmin;
    this.isUser = this.userService.isUser();

    if (this.isAdmin) {

      this.subscription = this.vacanciesService.vacancyChange.subscribe(
        (data: VacancyModel[]) => {
          console.log("OBSERVER");
          this.vacancies = data;
          this.loading = false;
          console.log(this.vacancies);
          this.pages = [];
          // pagination number of pages
          let numIndex = 1;
          for (let i = 0; i < this.vacancies.length; i++){
            if (i % this.resultCount === 0) {
              this.pages.push({num: numIndex});
              numIndex = numIndex + 1;
            }
          }
        }
      );
      if(!this.vacanciesService.vacancyServiceHasVacancies()){
        this.loading = true;
        this.vacanciesService.getVacancies();
      }

    }
    if (this.isUser) {

      this.subscription = this.vacanciesService.vacancyChange.subscribe(
        (data: VacancyModel[]) => {
          this.vacancies = data;
          this.loading = false;
          this.pages = [];
          // pagination number of pages
          let numIndex = 1;
          for (let i = 0; i < this.vacancies.length; i++){
            if (i % this.resultCount === 0) {
              this.pages.push({num: numIndex});
              numIndex = numIndex + 1;
            }
          }
        }
      );
      if(!this.vacanciesService.vacancyServiceHasVacancies()){
        this.loading = true;
        this.vacanciesService.getActiveVacancies();
      }
    }
    this.subscriptionRegions = this.regionsService.getRegions().subscribe(
      (data: RegionModel[]) => {
        this.regions = data;
      }
    );
    this.subscriptionWorkplaces = this.workplacesService.getWorkPlaces().subscribe(
      (data: WorkPlaceModel[]) => {
        this.workplaces = data;
      }
    );
    /*.subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
        console.log(this.vacancies);
      }
    );*/
  }

  refresh(){
    this.loading = true;
    if(this.isUser)
    this.vacanciesService.getActiveVacancies();
    else
      this.vacanciesService.getVacancies();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionWorkplaces.unsubscribe();
    this.subscriptionRegions.unsubscribe();
  }

  setResultCount(num: number) {
    this.resultCount = num;
  }

  setPage(num: number) {
    this.page = num;

/*    if (this.page === this.pages[this.pages.length - 1].num) {
      this.pages.forEach(page => page.num = page.num + 2);
      console.log(this.pages);
    }

    if (this.page === this.pages[0].num && this.pages[0].num !== 1) {
      this.pages.forEach(page => page.num = page.num - 2);
    }*/
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

  // onEdit() {
  //     this.allAtVacanciesItemComponents.forEach((atVacanciesItemComponent) => atVacanciesItemComponent.closeEdit());
  // }



}
