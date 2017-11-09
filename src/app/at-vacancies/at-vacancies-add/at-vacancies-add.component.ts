import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegionsService} from '../../services/regions.service';
import {RegionModel} from '../../models/region.model';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup} from '@angular/forms';
import {VacancyModel} from '../../models/vacancy.model';
import {VacanciesService} from '../../services/vacancies.service';
import {WorkPlaceModel} from '../../models/workPlace.model';

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

  constructor(private regionsService: RegionsService, private vacancyService: VacanciesService) { }

  ngOnInit() {

    this.subscription1 = this.regionsService.getRegions().subscribe(
      (data: RegionModel[]) => {
        this.regions = data;
    }
    );

    this.initForm();

  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
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
    const workPlace = this.newVacForm.value.workPlace;
    console.log('region:' + region);

  }
}
