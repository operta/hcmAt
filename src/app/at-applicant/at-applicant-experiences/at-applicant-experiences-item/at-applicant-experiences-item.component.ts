import {Component, Input, OnInit} from '@angular/core';
import {ApplicantExperienceModel} from "../../../_models/applicantExperience.model";
import {ApplicantExperiencesService} from "../../../_services/applicantExperiences.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-at-applicant-experiences-item',
  templateUrl: './at-applicant-experiences-item.component.html',
  styleUrls: ['./at-applicant-experiences-item.component.css']
})
export class AtApplicantExperiencesItemComponent implements OnInit {
  @Input() experience: ApplicantExperienceModel;
  isEdit: boolean;
  ongoing: boolean;
  ongoingString: string;

  constructor(private applicantExperiencesService: ApplicantExperiencesService) { }

  ngOnInit() {
    this.ongoing = false;
    this.isEdit = false;
  }


  onSubmit(form: NgForm){
    if(this.ongoing){
      this.ongoingString = "T";
    }
    else {
      this.ongoingString = "F";
    }
    this.experience.company = form.value.company;
    this.experience.location = form.value.location;
    this.experience.position = form.value.position;
    this.experience.ongoing = this.ongoingString;
    this.experience.date_from = form.value.date_from;
    this.experience.date_to = form.value.date_to;

    console.log(this.experience);

    this.applicantExperiencesService.updateApplicantExperience(this.experience);
    this.isEdit = false;

  }

  removeExperience(experience: ApplicantExperienceModel){
    this.applicantExperiencesService.removeApplicantExperience(experience);
  }


}
