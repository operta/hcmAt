import {Component, OnDestroy, OnInit} from '@angular/core';
import {VacancyModel} from '../../_models/vacancy.model';
import {VacanciesService} from '../../_services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {isNumber} from 'util';
import {ApplicantModel} from '../../_models/applicant.model';
import {JobApplicationModel} from '../../_models/jobApplication.model';
import {Observable} from 'rxjs/Observable';
import {AtJobApplicationsService} from "../../_services/at-job-applications.service";

@Component({
  selector: 'app-at-vacancies-detail',
  templateUrl: './at-vacancies-detail.component.html',
  styleUrls: ['./at-vacancies-detail.component.css']
})
export class AtVacanciesDetailComponent implements OnInit, OnDestroy {
  vacancy: VacancyModel;
  jobApplications: JobApplicationModel[];
  id: string;
  subscriptionParams: Subscription;
  finalGrade: number;

  constructor(private vacancyService: VacanciesService, private route: ActivatedRoute, private jobApplicationsService: AtJobApplicationsService) { }

  ngOnInit() {
    this.subscriptionParams = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.vacancy = this.vacancyService.getVacancy(+this.id);
        this.jobApplicationsService.initJobApplications(this.vacancy);
        this.jobApplications = this.jobApplicationsService.getJobApplications();
/*        this.subscriptionVacancy = this.vacancyService.getVacancy(this.id).subscribe(
          (data: VacancyModel) => {
            this.vacancy = data;
            console.log(this.vacancy);
            this.jobApplications = this.vacancy.jobApplications;
          }
        );*/
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionParams.unsubscribe();
  }



}
