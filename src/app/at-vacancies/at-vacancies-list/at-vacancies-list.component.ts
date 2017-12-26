import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VacancyModel} from '../../_models/vacancy.model';
import {VacanciesService} from '../../_services/vacancies.service';
import {Subscription} from 'rxjs/Subscription';
import {AtVacanciesItemComponent} from './at-vacancies-item/at-vacancies-item.component';
import {UserService} from '../../_services/user.service';
import {RegionModel} from '../../_models/region.model';
import {WorkPlaceModel} from '../../_models/workPlace.model';
import {RegionsService} from '../../_services/regions.service';
import {WorkPlacesService} from '../../_services/work-places.service';
import {PaginationService} from "../../_services/pagination.service";


@Component({
  selector: 'app-at-vacancies-list',
  templateUrl: './at-vacancies-list.component.html',
  styleUrls: ['./at-vacancies-list.component.css']
})
export class AtVacanciesListComponent implements OnInit, OnDestroy {
  @ViewChildren(AtVacanciesItemComponent) allAtVacanciesItemComponents: QueryList<AtVacanciesItemComponent>;
  vacancies: VacancyModel[];
  regions: RegionModel[];
  workplaces: WorkPlaceModel[];
  isUser = false;
  isAdmin = false;
  isCompany = false;
  subscription: Subscription;
  subscriptionRegions: Subscription;
  subscriptionWorkplaces: Subscription;
  loading = false;
  searchValue = '';
  searchByStatus = '';
  searchByWorkplace = '';
  searchByRegion = '';
  searchByDateFrom: Date = null;
  searchByDateTo: Date = null;
  searchableList: string[];

  start: number;
  end: number;

  constructor(private userService: UserService,
              private vacanciesService: VacanciesService,
              private regionsService: RegionsService,
              private workplacesService: WorkPlacesService,
              private paginationService: PaginationService) { }

  ngOnInit() {
    this.searchableList = ['name', 'description', 'code'];
    this.isAdmin = this.userService.isAdmin;
    this.isCompany = this.userService.isAdmin;
    this.isUser = this.userService.isUser();

    if (this.isAdmin) {

      this.subscription = this.vacanciesService.vacancyChange.subscribe(
        (data: VacancyModel[]) => {
          console.log('OBSERVER');
          this.vacancies = data;
          this.loading = false;

          this.paginationService.setPages(this.vacancies.length);
          this.start = this.paginationService.start();
          this.paginationService.startObserver.subscribe(
            start => this.start = start
          )
          this.end = this.paginationService.end();
          this.paginationService.endObserver.subscribe(
            end => this.end = end
          );
        }
      );
      if (!this.vacanciesService.vacancyServiceHasVacancies()) {
        this.loading = true;
        this.vacanciesService.getVacancies();
      }

    }
    if (this.isUser) {

      this.subscription = this.vacanciesService.vacancyChange.subscribe(
        (data: VacancyModel[]) => {
          this.vacancies = data;
          this.loading = false;
        }
      );
      if (!this.vacanciesService.vacancyServiceHasVacancies()) {
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

  refresh() {
    this.loading = true;
    if (this.isUser) {
      this.vacanciesService.getActiveVacancies();
    } else {
      this.vacanciesService.getVacancies();
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionWorkplaces.unsubscribe();
    this.subscriptionRegions.unsubscribe();
    this.paginationService.setPages(0);
  }

  // onEdit() {
  //     this.allAtVacanciesItemComponents.forEach((atVacanciesItemComponent) => atVacanciesItemComponent.closeEdit());
  // }
  resetSearchByDateFrom(result: string) {
    if (result == '') {
      console.log(result);
      this.searchByDateFrom = null;
    }
  }

  resetSearchByDateTo(result: string) {
    if (result == '') {
      console.log(result);
      this.searchByDateTo = null;
    }
  }


}
