import { Component, OnInit } from '@angular/core';
import {AtJobApplicationsService} from '../_services/at-job-applications.service';
import {JobApplicationModel} from "../_models/jobApplication.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-at-job-applications',
  templateUrl: './at-job-applications.component.html',
  styleUrls: ['./at-job-applications.component.css']
})
export class AtJobApplicationsComponent implements OnInit {

  jobApplication: JobApplicationModel;
  id: number;
  active: string;
  state = 'interview';

  constructor(private router: Router, private route: ActivatedRoute, private jobApplicationsService: AtJobApplicationsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.jobApplication = this.jobApplicationsService.getJobApplicationById(+this.id);
        console.log(this.jobApplication);
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
