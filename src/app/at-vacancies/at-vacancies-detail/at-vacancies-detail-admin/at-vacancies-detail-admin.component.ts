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
import {PaginationService} from "../../../_services/pagination.service";

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
  start: number;
  end: number;


  constructor(private applicantsService: ApplicantsService,
              private vacancyService: VacanciesService,
              private route: ActivatedRoute,
              private jobApplicationsService: AtJobApplicationsService,
              private jobApplicationStatusesService: JobApplicationStatusesService,
              private paginationService: PaginationService) { }

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

        this.paginationService.setPages(this.jobApplications.length);
        this.start = this.paginationService.start();
        this.paginationService.startObserver.subscribe(
          start => this.start = start
        )
        this.end = this.paginationService.end();
        this.paginationService.endObserver.subscribe(
          end => this.end = end
        );
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
