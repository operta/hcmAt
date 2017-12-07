import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicantModel} from "../../../_models/applicant.model";
import {ContactTypeModel} from "../../../_models/contactType.model";
import {NgForm} from "@angular/forms";
import {ApplicantContactsService} from "../../../_services/applicantContacts.service";
import {ApplicantContactModel} from "../../../_models/applicantContact.model";

@Component({
  selector: 'app-at-applicant-contacts-add',
  templateUrl: './at-applicant-contacts-add.component.html',
  styleUrls: ['./at-applicant-contacts-add.component.css']
})
export class AtApplicantContactsAddComponent implements OnInit {
  @Input() applicant: ApplicantModel;
  @Input() contactTypes: ContactTypeModel[];
  @Output() onClose = new EventEmitter();
  selectedContactType: ContactTypeModel;

  constructor(private applicantContactsService: ApplicantContactsService) { }

  ngOnInit() {
    this.selectedContactType = this.contactTypes[0];
  }

  close(){
    this.onClose.emit();
  }

  onSubmit(form: NgForm){
    var contact = new ApplicantContactModel(
      null,
      this.applicant,
      this.selectedContactType,
      form.value.contact,
      form.value.description,
      null,
      new Date,
      null,
      new Date
    );

    this.applicantContactsService.addApplicantContact(contact);


    this.close();
  }

}
