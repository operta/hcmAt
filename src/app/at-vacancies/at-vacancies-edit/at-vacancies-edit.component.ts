import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VacancyModel} from '../../models/vacancy.model';
import {Subscription} from 'rxjs/Subscription';
import {VacanciesService} from '../../services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {NgForm} from "@angular/forms";
import {RegionModel} from "../../models/region.model";
import {RegionsService} from "../../services/regions.service";

@Component({
  selector: 'app-at-vacancies-edit',
  templateUrl: './at-vacancies-edit.component.html',
  styleUrls: ['./at-vacancies-edit.component.css']
})
export class AtVacanciesEditComponent implements OnInit, OnDestroy {

  @Input() vacancy: VacancyModel;
  regions: RegionModel[] = [];


  id: string;
  subscriptionVacancy: Subscription;
  submitted: boolean;
  subscriptionRegions: Subscription;
  selectedRegion = null;

  constructor(private vacancyService: VacanciesService, private regionsService: RegionsService) {
  }

  ngOnInit() {
    this.selectedRegion = this.vacancy.id_location;
    this.submitted = false;
    this.subscriptionRegions = this.regionsService.getRegions().subscribe(
      (data: RegionModel[]) => {
        this.regions = data;
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


    console.log(this.vacancy);
    this.subscriptionVacancy = this.vacancyService.updateVacancy(this.vacancy)
      .subscribe(
        result => console.log(result)
      );
    this.submitted = true;


  }
}
