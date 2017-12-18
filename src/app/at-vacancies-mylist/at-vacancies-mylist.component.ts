import {Component, Input, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {VacancyModel} from '../_models/vacancy.model';
import {VacanciesService} from '../_services/vacancies.service';
import {AtJobApplicationsService} from '../_services/at-job-applications.service';
import {JobApplicationModel} from '../_models/jobApplication.model';
import {JobApplicationStatusModel} from '../_models/jobApplicationStatus.model';
import {UserService} from '../_services/user.service';

import { Response } from '@angular/http';
import {ApplicantsService} from '../_services/applicants.service';
import {ApplicantModel} from '../_models/applicant.model';
import {UserModel} from '../_models/user.model';
import {PaginationService} from "../_services/pagination.service";

@Component({
  selector: 'app-at-vacancies-mylist',
  templateUrl: './at-vacancies-mylist.component.html',
  styleUrls: ['./at-vacancies-mylist.component.css']
})
export class AtVacanciesMylistComponent implements OnInit, OnDestroy {

  options: number[] = [1, 10, 15, 20, 25, 30];
  pages = [];
  resultCount = 15;
  page = 1;
  @Input() id: number;
  /*  subscription: Subscription;*/
  private vacancies: VacancyModel[];
  private jobApplications: JobApplicationModel[];

  start: number;
  end: number;

  constructor(private paginationService: PaginationService, private userService: UserService, private applicantService: ApplicantsService, private jobApplicationsService: AtJobApplicationsService, private vacanciesService: VacanciesService) {
  }

  ngOnInit() {
    /*this.subscription =*/
    // FUJ
    // User service to get the user id if its a user, if not than get id from admin panel
    if (!this.id) {
      this.userService.getUser().subscribe(
        (response: UserModel) => {
          this.applicantService.getApplicant(response.id).subscribe(
            (data: ApplicantModel) => {
              this.jobApplicationsService.getJobApplicationsByApplicantId(data.id);
            }
          );
        }
      );
    } else {
      this.jobApplicationsService.getJobApplicationsByApplicantId(this.id);
    }

    this.jobApplicationsService.jobApplicationsChange.subscribe(
      data => {
        this.jobApplications = data;


        this.paginationService.setPages(this.jobApplications.length);
        this.start = this.paginationService.start();
        this.paginationService.startObserver.subscribe(
          start => this.start = start
        )
        this.end = this.paginationService.end();
        this.paginationService.endObserver.subscribe(
          end => this.end = end
        );
        console.log(this.jobApplications);
      }
    );
    /*.subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
        console.log(this.vacancies);
      }
    );*/
  }

  ngOnDestroy() {
  }

  setResultCount(num: number) {
    this.resultCount = num;
  }
}
