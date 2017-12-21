import {Component, OnDestroy, OnInit} from '@angular/core';
import {VacancyModel} from '../../_models/vacancy.model';
import {VacanciesService} from '../../_services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ApplicantModel} from '../../_models/applicant.model';
import {JobApplicationModel} from '../../_models/jobApplication.model';
import {Observable} from 'rxjs/Observable';
import {AtJobApplicationsService} from "../../_services/at-job-applications.service";
import {ApplicantsService} from "../../_services/applicants.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-at-vacancies-detail',
  templateUrl: './at-vacancies-detail.component.html',
  styleUrls: ['./at-vacancies-detail.component.css']
})
export class AtVacanciesDetailComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isUser = false;

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.isAdmin = this.userService.isAdmin;
    this.isUser = this.userService.isUser();
  }

  ngOnDestroy() {

  }

}
