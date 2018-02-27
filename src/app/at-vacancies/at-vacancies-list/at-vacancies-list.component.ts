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
  page: any;
  start: number;
  end: number;
  fromDate: string;
  toDate: string;
  name: string;
  regionId: string;
  statusId: string;
  toggleAdvSearch = false;

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
          this.vacanciesService.querySearch({
            page: page,
            size: 15,
            fromDate: this.fromDate,
            toDate: this.toDate,
            name: this.name,
            statusId: this.statusId,
            regionId: this.regionId,
            dateFormat: "yyyy-MM-dd"
          });
        }
        if (this.isUser) {
          this.loading = true;

          this.vacanciesService.querySearch({
            page: page,
            size: 15,
            fromDate: this.fromDate,
            toDate: this.toDate,
            name: this.name,
            statusId: "ACTIVE",
            regionId: this.regionId,
            dateFormat: "yyyy-MM-dd"
          });
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

  clearFilters() {
    this.name = null;
    this.statusId = null;
    this.fromDate = null;
    this.toDate = null;
    this.regionId = null;
    this.onSearchChange();
  }

  onSearchChange() {
    this.vacanciesService.querySearch({
      page: 0,
      size: 15,
      fromDate: this.fromDate,
      toDate: this.toDate,
      name: this.name,
      statusId: this.statusId,
      regionId: this.regionId
    });
    this.pagingService.setPage(0);
  }

  refresh() {
    this.loading = true;
    if (this.isUser) {
      this.vacanciesService.querySearch({
        page: 0,
        size: 15,
        fromDate: this.fromDate,
        toDate: this.toDate,
        name: this.name,
        statusId: this.statusId,
        regionId: this.regionId,
        dateFormat: "yyyy-MM-dd"
      });
    } else {
      this.vacanciesService.querySearch({
        page: 0,
        size: 15,
        fromDate: this.fromDate,
        toDate: this.toDate,
        name: this.name,
        statusId: "ACTIVE",
        regionId: this.regionId,
        dateFormat: "yyyy-MM-dd"
      });
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
