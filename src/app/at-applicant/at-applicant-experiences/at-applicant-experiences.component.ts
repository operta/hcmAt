import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ApplicantModel} from "../../_models/applicant.model";
import {ApplicantExperiencesService} from "../../_services/applicantExperiences.service";
import {ApplicantExperienceModel} from "../../_models/applicantExperience.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-at-applicant-experiences',
  templateUrl: './at-applicant-experiences.component.html',
  styleUrls: ['./at-applicant-experiences.component.css']
})
export class AtApplicantExperiencesComponent implements OnInit, OnDestroy {
  @Input() applicant: ApplicantModel;
  @Input() editable: boolean;
  @Output() currentExperience = new EventEmitter<ApplicantExperienceModel>();
  experiences: ApplicantExperienceModel[];
  addExperience: boolean;
  subscription: Subscription;

  constructor(private applicantExperiencesService: ApplicantExperiencesService) { }

  ngOnInit() {
    this.applicantExperiencesService.getApplicantExperiences(this.applicant);
    this.subscription = this.applicantExperiencesService.ExperiencesObserver.subscribe(
      (data: ApplicantExperienceModel[]) => {
        this.experiences = data;
        this.currentExperience.emit(this.experiences[0]);
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClose(){
    this.addExperience = false;
  }

}
