import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegionsService} from '../../services/regions.service';
import {RegionModel} from '../../models/region.model';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup} from '@angular/forms';
import {VacancyModel} from '../../models/vacancy.model';
import {VacanciesService} from '../../services/vacancies.service';
import {WorkPlaceModel} from '../../models/workPlace.model';
import {WorkPlacesService} from '../../services/work-places.service';

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

  workString: string;

  constructor(private regionsService: RegionsService, private vacancyService: VacanciesService, private workPlacesService: WorkPlacesService) { }

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
      (data: string) => {
        this.workString = data;
      }
    );
  }


  initForm() {
    this.newVacForm = new FormGroup({
      'name': new FormControl(''),
      'code': new FormControl(''),
      'description': new FormControl(''),
      'region': new FormControl(''),
      'workPlace': new FormControl('')
    })
  }

  onSubmit() {
    console.log('blalba');
    const name = this.newVacForm.value.name;
    const code = this.newVacForm.value.code;
    const description = this.newVacForm.value.description;
    const region = this.newVacForm.value.region;
    const workPlace = JSON.stringify(this.workPlaces[0]);
    console.log('REGiONS:' + this.regions);
    console.log('WORK PLACE:' + workPlace);
    const vacancy = new VacancyModel(
      '932183',
      name,
      code,
      description,
      region,
      new Date,
      new Date,
      workPlace,
      '',
      new Date,
      '',
      new Date
    );
    this.vacancyService.saveVacancy(vacancy);
  }
}
