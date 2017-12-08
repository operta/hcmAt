import {Component, Input, OnInit} from '@angular/core';
import {ApplicantModel} from "../../../_models/applicant.model";
import {ApplicantExperienceModel} from "../../../_models/applicantExperience.model";
import {Subscription} from "rxjs/Subscription";
import {ApplicantExperiencesService} from "../../../_services/applicantExperiences.service";

@Component({
  selector: 'app-at-applicant-experiences-list',
  templateUrl: './at-applicant-experiences-list.component.html',
  styleUrls: ['./at-applicant-experiences-list.component.css']
})
export class AtApplicantExperiencesListComponent implements OnInit {
  @Input() applicant: ApplicantModel;
  @Input() experiences: ApplicantExperienceModel[];

  constructor() { }

  ngOnInit() {}

}
