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
import {VacanciesStatusModel} from '../../_models/vacanciesStatus.model';
import {QualificationModel} from "../../_models/qualification";
import {QualificationsService} from "../../_services/qualifications.service";

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
  qualifications: QualificationModel[];


  constructor(private qualificationsService: QualificationsService, private route: ActivatedRoute, private regionsService: RegionsService, private vacancyService: VacanciesService, private workPlacesService: WorkPlacesService, private router: Router) { }

  ngOnInit() {
    this.initData();
    this.initForm();
    this.qualificationsService.getQualifications();
    this.qualificationsService.qualificationsObserver.subscribe(
      data => {
        this.qualifications = data;
      }
    );
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
      'date_to': new FormControl(''),
      'job_role': new FormControl(''),
      'job_working_time': new FormControl(''),
      'skills_requirement': new FormControl(''),
      'language_requirement': new FormControl(''),
      'education_requirement': new FormControl(''),
      'experience_requirement': new FormControl('')
    });
  }

  onSubmit() {
    console.log()
    const name = this.newVacForm.value.name;
    const code = this.newVacForm.value.code;
    const description = this.newVacForm.value.description;
    const region = this.newVacForm.value.region;
    const workPlace = this.newVacForm.value.workPlace;
    const date_from = this.newVacForm.value.date_from;
    const date_to = this.newVacForm.value.date_to;
    const job_role = this.newVacForm.value.job_role;
    const job_working_time = this.newVacForm.value.job_working_time;
    const skills_requirement = this.newVacForm.value.skills_requirement;
    const language_requirement = this.newVacForm.value.language_requirement;
    const education_requirement = this.newVacForm.value.education_requirement;
    const experience_requirement = this.newVacForm.value.experience_requirement;

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
      new Date,
      [],
      new VacanciesStatusModel(1, 'ACTIVE'),
      job_role,
      job_working_time,
      skills_requirement,
      language_requirement,
      education_requirement,
      experience_requirement
    );
    this.vacancyService.saveVacancy(vacancy);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  redirect() {
    console.log(this.router.url);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
