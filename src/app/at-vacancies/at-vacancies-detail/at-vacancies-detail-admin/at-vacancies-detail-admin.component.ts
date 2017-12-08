import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {VacancyModel} from '../../../_models/vacancy.model';
import {JobApplicationModel} from '../../../_models/jobApplication.model';
import {Subscription} from 'rxjs/Subscription';
import {ApplicantsService} from '../../../_services/applicants.service';
import {VacanciesService} from '../../../_services/vacancies.service';
import {AtJobApplicationsService} from '../../../_services/at-job-applications.service';

@Component({
  selector: 'app-at-vacancies-detail-admin',
  templateUrl: './at-vacancies-detail-admin.component.html',
  styleUrls: ['./at-vacancies-detail-admin.component.css']
})
export class AtVacanciesDetailAdminComponent implements OnInit, OnDestroy {
  vacancy: VacancyModel;
  jobApplications: JobApplicationModel[];
  id: string;
  subscriptionParams: Subscription;

  constructor(private applicantsService: ApplicantsService, private vacancyService: VacanciesService, private route: ActivatedRoute, private jobApplicationsService: AtJobApplicationsService) { }

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
