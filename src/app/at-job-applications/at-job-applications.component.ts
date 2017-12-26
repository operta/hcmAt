import { Component, OnInit } from '@angular/core';
import {AtJobApplicationsService} from '../_services/at-job-applications.service';
import {JobApplicationModel} from "../_models/jobApplication.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {JobApplicationInterviewModel} from "../_models/jobApplicationInterview.model";
import {JobApplicationTestModel} from "../_models/jobApplicationTest.model";
import {JobApplicationInterviewService} from "../_services/jobApplicationInterview.service";
import {JobApplicationTestService} from "../_services/jobApplicationTest.service";
import {ApplicantModel} from "../_models/applicant.model";
import {VacancyModel} from "../_models/vacancy.model";

@Component({
  selector: 'app-at-job-applications',
  templateUrl: './at-job-applications.component.html',
  styleUrls: ['./at-job-applications.component.css']
})
export class AtJobApplicationsComponent implements OnInit {

  interviews: JobApplicationInterviewModel[];
  tests: JobApplicationTestModel[];
  jobApplication: JobApplicationModel;
  id: number;
  active: string;
  state = 'interview';

  constructor(private testService: JobApplicationTestService, private interviewService: JobApplicationInterviewService, private router: Router, private route: ActivatedRoute, private jobApplicationsService: AtJobApplicationsService) { }

  ngOnInit() {

    this.interviewService.interviewChange.subscribe(
      (data: JobApplicationInterviewModel[]) => {
        this.interviews = data;
      }
    );


    this.testService.testChange.subscribe(
      (data: JobApplicationTestModel[]) => {
        this.tests = data;
        console.log(this.tests);
      }
    );

    this.jobApplicationsService.jobApplicationChange.subscribe(
      data => {
        console.log('subscribe na change');
        console.log(data);
        this.jobApplication = data;
        this.interviewService.initInterviews(this.jobApplication.interview);
        this.testService.initTests(this.jobApplication.test);
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if (this.jobApplicationsService.isEmpty()) {
          this.jobApplicationsService.getJobApplicationByIdHTTP(this.id);
        } else {
          this.jobApplication = this.jobApplicationsService.getJobApplicationById(+this.id);
          this.interviewService.initInterviews(this.jobApplication.interview);
          this.testService.initTests(this.jobApplication.test);
        }


      }
    )

  }

  navigate(state: string) {
    this.router.navigate(['add'], {relativeTo: this.route, queryParams: {add: this.state}});
  }

  resetLink() {
    this.router.navigate(['dashboard', 'jobApplication', this.id]);
  }
}
