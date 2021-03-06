import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ApplicantAccomplishmentModel} from "../../../_models/applicantAccomplishment.model";
import {NgForm} from "@angular/forms";
import {ApplicantAccomplishmentsService} from "../../../_services/applicantAccomplishments.service";
import {Popup} from "ng2-opd-popup";
import {ApplicantModel} from "../../../_models/applicant.model";

@Component({
  selector: 'app-at-applicant-accomplishments-item',
  templateUrl: './at-applicant-accomplishments-item.component.html',
  styleUrls: ['./at-applicant-accomplishments-item.component.css']
})
export class AtApplicantAccomplishmentsItemComponent implements OnInit, OnChanges {
  @Input() applicantAccomplishment: ApplicantAccomplishmentModel;
  @Input() editable: boolean;

  isEdit: boolean;
  ongoing: boolean;
  ongoingString: string;

  constructor(private applicantAccomplishmentsService: ApplicantAccomplishmentsService) { }


  ngOnInit() { if(this.applicantAccomplishment.ongoing == "T"){
    this.ongoing = true;
  }
  else if(this.applicantAccomplishment.ongoing == "F"){
    this.ongoing = false;
  }
    this.isEdit = false;
    this.isEdit = false;
  }

  ngOnChanges(changes: SimpleChanges){
    this.applicantAccomplishment = changes.applicantAccomplishment.currentValue;
  }

  onSubmit(form: NgForm){
    if(this.ongoing){
      this.ongoingString = "T";
    }
    else {
      this.ongoingString = "F";
    }
    const newApplicant = new ApplicantModel(
      this.applicantAccomplishment.idApplicant.id,
      null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, null, null,null,
      null,null,null,null
    );
    this.applicantAccomplishment.idApplicant = newApplicant;
    this.applicantAccomplishment.title = form.value.title;
    this.applicantAccomplishment.description = form.value.description;
    this.applicantAccomplishment.association = form.value.association;
    this.applicantAccomplishment.ongoing = this.ongoingString;
    this.applicantAccomplishment.link = form.value.link;
    this.applicantAccomplishment.date_from = form.value.date_from;
    this.applicantAccomplishment.date_to = form.value.date_to;
    this.applicantAccomplishment.proficiency = form.value.proficiency;
    this.applicantAccomplishment.licence_number = form.value.licence_number;
    this.applicantAccomplishment.occupation = form.value.occupation;


    this.applicantAccomplishmentsService.updateApplicantAccomplishment(this.applicantAccomplishment);
    this.isEdit = false;

  }

  removeAccomplishment(accomplishment: ApplicantAccomplishmentModel){
    this.applicantAccomplishmentsService.removeApplicantAccomplishment(accomplishment);
  }

}
