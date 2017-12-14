import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {VacancyModel} from '../../../_models/vacancy.model';
import {JobApplicationModel} from '../../../_models/jobApplication.model';
import {Subscription} from 'rxjs/Subscription';
import {ApplicantsService} from '../../../_services/applicants.service';
import {VacanciesService} from '../../../_services/vacancies.service';
import {AtJobApplicationsService} from '../../../_services/at-job-applications.service';
import {JobApplicationStatusModel} from "../../../_models/jobApplicationStatus.model";
import {JobApplicationStatusesService} from "../../../_services/jobApplicationStatuses.service";

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
  subscriptionStatus: Subscription;
  jobApplicationStatuses: JobApplicationStatusModel[];


  pages = [];
  resultCount = 15;
  page = 1;

  constructor(private applicantsService: ApplicantsService,
              private vacancyService: VacanciesService,
              private route: ActivatedRoute,
              private jobApplicationsService: AtJobApplicationsService,
              private jobApplicationStatusesService: JobApplicationStatusesService) { }

  ngOnInit() {
    this.jobApplicationStatusesService.getJobApplicationStatuses();
    this.subscriptionStatus = this.jobApplicationStatusesService.jobApplicationStatusObserver.subscribe(
      (data: JobApplicationStatusModel[]) => {
        this.jobApplicationStatuses = data;
        console.log(this.jobApplicationStatuses);

      }
    );
    this.subscriptionParams = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.vacancy = this.vacancyService.getVacancy(+this.id);
        this.jobApplicationsService.initJobApplications(this.vacancy);
        this.jobApplications = this.jobApplicationsService.getJobApplications();
        this.pages = [];
        let numIndex = 1;
        for (let i = 0; i < this.jobApplications.length; i++) {
          if (i % this.resultCount === 0) {
            this.pages.push({num: numIndex});
            numIndex = numIndex + 1;
          }
        }
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


  setPage(num: number) {
    this.page = num;
  }

  start() {
    return this.resultCount * this.page - this.resultCount;
  }

  end() {
    return this.resultCount * this.page;
  }
}
