import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {VacancyModel} from '../../_models/vacancy.model';
import {Subscription} from 'rxjs/Subscription';
import {VacanciesService} from '../../_services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {NgForm} from "@angular/forms";
import {RegionModel} from "../../_models/region.model";
import {RegionsService} from "../../_services/regions.service";
import {WorkPlaceModel} from "../../_models/workPlace.model";
import {WorkPlacesService} from "../../_services/work-places.service";

@Component({
  selector: 'app-at-vacancies-edit',
  templateUrl: './at-vacancies-edit.component.html',
  styleUrls: ['./at-vacancies-edit.component.css']
})
export class AtVacanciesEditComponent implements OnInit, OnDestroy {

  @Input() vacancy: VacancyModel;
  @Output() onUpdate = new EventEmitter();
  regions: RegionModel[] = [];
  workplaces: WorkPlaceModel[] = [];


  id: string;
  subscriptionVacancy: Subscription;
  //submitted: boolean;
  subscriptionRegions: Subscription;
  subscriptionWorkplaces: Subscription;
  selectedRegion = null;
  selectedWorkplace = null;

  constructor(private vacancyService: VacanciesService, private regionsService: RegionsService, private workplacesService: WorkPlacesService) {
  }

  ngOnInit() {
    this.selectedWorkplace = this.vacancy.id_work_place;
    this.selectedRegion = this.vacancy.id_location;
    //this.submitted = false;
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
  }


  ngOnDestroy() {
    this.subscriptionRegions.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.vacancy.name = form.value.name;
    this.vacancy.code = form.value.code;
    this.vacancy.description = form.value.description;
    this.vacancy.date_from = form.value.date_from;
    this.vacancy.date_to = form.value.date_to;
    this.vacancy.id_location = this.selectedRegion;
    this.vacancy.id_work_place = this.selectedWorkplace


    console.log(this.vacancy);
    this.subscriptionVacancy = this.vacancyService.updateVacancy(this.vacancy)
      .subscribe(
        result => console.log(result)
      );
    //this.submitted = true;
    this.onUpdate.emit();


  }
}
