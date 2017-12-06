import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicantModel} from "../../../_models/applicant.model";
import {ApplicantExperiencesService} from "../../../_services/applicantExperiences.service";
import {NgForm} from "@angular/forms";
import {ApplicantExperienceModel} from "../../../_models/applicantExperience.model";

@Component({
  selector: 'app-at-applicant-experiences-add',
  templateUrl: './at-applicant-experiences-add.component.html',
  styleUrls: ['./at-applicant-experiences-add.component.css']
})
export class AtApplicantExperiencesAddComponent implements OnInit {
  @Input() applicant: ApplicantModel;
  @Output() onClose = new EventEmitter();
  ongoing: boolean;
  ongoingString : string;

  constructor(private applicantExperiencesService: ApplicantExperiencesService) { }

  ngOnInit() {
    this.ongoing = false;
  }

  onSubmit(form:NgForm){
    if(this.ongoing){
      this.ongoingString = "T";
    }
    else {
      this.ongoingString = "F";
    }
    console.log(form.value);
    var applicantExperience = new ApplicantExperienceModel(
      null,
      this.applicant,
      form.value.company,
      form.value.position,
      form.value.location,
      this.ongoingString,
      form.value.date_from,
      form.value.date_to,
      null,
      new Date,
      null,
      new Date
    );
    console.log(applicantExperience);
    this.applicantExperiencesService.addApplicantExperience(applicantExperience);
    this.close();
  }

  close(){
    this.onClose.emit();
  }

}
