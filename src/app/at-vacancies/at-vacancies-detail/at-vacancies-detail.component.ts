import {Component, OnDestroy, OnInit} from '@angular/core';
import {VacancyModel} from '../../models/vacancy.model';
import {VacanciesService} from '../../services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {isNumber} from 'util';
import {ApplicantModel} from '../../models/applicant.model';
import {JobApplicationModel} from '../../models/jobApplication.model';

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
  subscriptionVacancy: Subscription;

  constructor(private vacancyService: VacanciesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptionParams = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        // this.vacancy = this.vacancyService.getVacancy(+this.id);
        this.vacancyService.getVacancy(this.id).subscribe(
          (data: VacancyModel) => {
            this.vacancy = data;
            this.jobApplications = this.vacancy.jobApplications;
            console.log(this.jobApplications);
          }
        )

      }
    );
  }

  ngOnDestroy() {
    this.subscriptionParams.unsubscribe();
    this.subscriptionVacancy.unsubscribe();
  }

}
