import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {ApplicantModel} from "../../../_models/applicant.model";
import {AccomplishmentTypeModel} from "../../../_models/accomplishmentType.model";
import {NgForm} from "@angular/forms";
import {ApplicantAccomplishmentModel} from "../../../_models/applicantAccomplishment.model";
import {ApplicantAccomplishmentsService} from "../../../_services/applicantAccomplishments.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-at-applicat-accomplishments-add',
  templateUrl: './at-applicat-accomplishments-add.component.html',
  styleUrls: ['./at-applicat-accomplishments-add.component.css']
})
export class AtApplicatAccomplishmentsAddComponent implements OnInit {
  @Input() selectedAccomplishmentType: AccomplishmentTypeModel;
  @Input() applicant: ApplicantModel;
  @Output() onClose = new EventEmitter();
  ongoing:boolean;
  ongoingString : string;



  constructor(public toastr: ToastsManager, private applicantAccomplishmentsService: ApplicantAccomplishmentsService) {
  }


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
    const newApplicant = new ApplicantModel(
      this.applicant.id,
      null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, null, null,null,
      null,null,null,null
    );
    var applicantAccomplishment = new ApplicantAccomplishmentModel(
      null,
      newApplicant,
      this.selectedAccomplishmentType,
      form.value.title,
      form.value.description,
      null,
      null,
      form.value.association,
      this.ongoingString,
      form.value.link,
      form.value.date_from,
      form.value.date_to,
      form.value.proficiency,
      form.value.occupation,
      form.value.licence_number,
      null,
      new Date,
      null,
      new Date
    );
    console.log(applicantAccomplishment);

    this.applicantAccomplishmentsService.addApplicantAccomplishment(applicantAccomplishment);
    this.close();
  }

  close(){
    this.onClose.emit();
  }

}
