import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {ApplicantsService} from "../_services/applicants.service";
import {ApplicantModel} from "../_models/applicant.model";

@Component({
  selector: 'app-applicant-overview',
  templateUrl: './applicant-overview.component.html',
  styleUrls: ['./applicant-overview.component.css']
})
export class ApplicantOverviewComponent implements OnInit, OnDestroy{
  applicantId: string;
  applicant: ApplicantModel;
  subscriptionRoute: Subscription;
  state = 'personalInfo';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptionRoute = this.route.data.subscribe(
      (data: {applicant: ApplicantModel}) => {
        this.applicant = data.applicant;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionRoute.unsubscribe();
  }

}
