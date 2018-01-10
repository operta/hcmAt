import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VacancyModel} from '../../_models/vacancy.model';
import {VacanciesService} from '../../_services/vacancies.service';
import {Subscription} from 'rxjs/Subscription';
import {AtVacanciesItemComponent} from './at-vacancies-item/at-vacancies-item.component';
import {UserService} from '../../_services/user.service';
import {RegionModel} from '../../_models/region.model';
import {RegionsService} from '../../_services/regions.service';
import {PagingService} from "../../_services/paging.service";


@Component({
  selector: 'app-at-vacancies-list',
  templateUrl: './at-vacancies-list.component.html',
  styleUrls: ['./at-vacancies-list.component.css']
})
export class AtVacanciesListComponent implements OnInit, OnDestroy {
  @ViewChildren(AtVacanciesItemComponent) allAtVacanciesItemComponents: QueryList<AtVacanciesItemComponent>;
  vacancies: VacancyModel[];
  regions: RegionModel[];
  isUser = false;
  isAdmin = false;
  isCompany = false;
  subscription: Subscription;
  subscriptionRegions: Subscription;
  loading = false;
  searchValue = '';
  searchByStatus = '';
  searchByRegion = '';
  searchByDateFrom: Date = null;
  searchByDateTo: Date = null;
  searchableList: string[];

  start: number;
  end: number;

  constructor(private userService: UserService,
              private vacanciesService: VacanciesService,
              private regionsService: RegionsService,
              private pagingService: PagingService) { }

  ngOnInit() {
    this.searchableList = ['name', 'description', 'code'];
    this.isAdmin = this.userService.isAdmin;
    this.isCompany = this.userService.isAdmin;
    this.isUser = this.userService.isUser();
    this.pagingService.vacancylist.next(true);
    this.pagingService.pageObservable.subscribe(
      page => {
        if (this.isAdmin) {
          this.loading = true;
          this.vacanciesService.getVacancies(page, this.pagingService.resultCount);
        }
        if (this.isUser) {
          this.loading = true;
          this.vacanciesService.getActiveVacancies(page, this.pagingService.resultCount);
        }
      }
    );

    this.pagingService.setPage(0);

    this.subscription = this.vacanciesService.vacancyChange.subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
        this.loading = false;
      }
    );



    this.subscriptionRegions = this.regionsService.getRegions().subscribe(
      (data: RegionModel[]) => {
        this.regions = data;
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
      this.vacanciesService.getActiveVacancies(0, 15);
    } else {
      this.vacanciesService.getVacancies(0, 15);
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionRegions.unsubscribe();
    this.pagingService.setPages(0, 0);
    this.pagingService.vacancylist.next(false);

  }

  // onEdit() {
  //     this.allAtVacanciesItemComponents.forEach((atVacanciesItemComponent) => atVacanciesItemComponent.closeEdit());
  // }
  resetSearchByDateFrom(result: string) {
    if (result == '') {
      this.searchByDateFrom = null;
    }
  }

  resetSearchByDateTo(result: string) {
    if (result == '') {
      this.searchByDateTo = null;
    }
  }


}
