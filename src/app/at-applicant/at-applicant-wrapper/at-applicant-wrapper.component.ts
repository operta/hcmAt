import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";
import {ApplicantsService} from "../../_services/applicants.service";
import {UserModel} from "../../_models/user.model";
import {ApplicantModel} from "../../_models/applicant.model";

@Component({
  selector: 'app-at-applicant-wrapper',
  templateUrl: './at-applicant-wrapper.component.html',
  styleUrls: ['./at-applicant-wrapper.component.css']
})
export class AtApplicantWrapperComponent implements OnInit {
  applicant: ApplicantModel;
  loading: boolean = false;
  user: UserModel;

  constructor(private userService: UserService,
              private applicantService: ApplicantsService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUser().subscribe(
      (data: UserModel) => {
        this.user = data;
        this.getApplicant(data.id);
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getApplicant(userId: string) {
    this.applicantService.getApplicant(userId).subscribe(
      (data: ApplicantModel) => {
        this.applicant = data;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

}
