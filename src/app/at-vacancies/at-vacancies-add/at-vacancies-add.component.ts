import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegionsService} from '../../_services/regions.service';
import {RegionModel} from '../../_models/region.model';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup} from '@angular/forms';
import {VacancyModel} from '../../_models/vacancy.model';
import {VacanciesService} from '../../_services/vacancies.service';
import {WorkPlaceModel} from '../../_models/workPlace.model';
import {WorkPlacesService} from '../../_services/work-places.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-at-vacancies-add',
  templateUrl: './at-vacancies-add.component.html',
  styleUrls: ['./at-vacancies-add.component.css']
})
export class AtVacanciesAddComponent implements OnInit, OnDestroy {

  newVacForm: FormGroup;
  regions: RegionModel[];
  workPlaces: WorkPlaceModel[];
  subscription1: Subscription;
  subscription2: Subscription;


  constructor(private route: ActivatedRoute, private regionsService: RegionsService, private vacancyService: VacanciesService, private workPlacesService: WorkPlacesService, private router: Router) { }

  ngOnInit() {
    this.initData();
    this.initForm();

  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }


  initData() {
    this.subscription1 = this.regionsService.getRegions().subscribe(
      (data: RegionModel[]) => {
        this.regions = data;
      }
    );

    this.subscription2 = this.workPlacesService.getWorkPlaces().subscribe(
      (data: WorkPlaceModel[]) => {
        this.workPlaces = data;
      }
    );
  }


  initForm() {
    this.newVacForm = new FormGroup({
      'name': new FormControl(''),
      'code': new FormControl(''),
      'description': new FormControl(''),
      'region': new FormControl(''),
      'workPlace': new FormControl(''),
      'date_from': new FormControl(''),
      'date_to': new FormControl('')
    });
  }

  onSubmit() {
    const name = this.newVacForm.value.name;
    const code = this.newVacForm.value.code;
    const description = this.newVacForm.value.description;
    const region = this.newVacForm.value.region;
    const workPlace = this.newVacForm.value.workPlace;
    const date_from = this.newVacForm.value.date_from;
    const date_to = this.newVacForm.value.date_to;

    const vacancy = new VacancyModel(
      null,
      code,
      name,
      description,
      region,
      date_from,
      date_to,
      workPlace,
      '',
      new Date,
      '',
      new Date
    );
    this.vacancyService.saveVacancy(vacancy);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  redirect() {
    console.log(this.router.url);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
