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

  constructor(private userService: UserService, private applicantService: ApplicantsService, private jobApplicationsService: AtJobApplicationsService, private vacanciesService: VacanciesService) {
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
        this.pages = [];
        let numIndex = 1;
        for (let i = 0; i < this.jobApplications.length; i++) {
          if (i % this.resultCount === 0) {
            this.pages.push({num: numIndex});
            numIndex = numIndex + 1;
          }
        }
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
