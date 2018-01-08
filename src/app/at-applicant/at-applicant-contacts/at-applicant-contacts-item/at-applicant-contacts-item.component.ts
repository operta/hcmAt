import {Component, Input, OnInit} from '@angular/core';
import {ApplicantContactModel} from "../../../_models/applicantContact.model";
import {ApplicantContactsService} from "../../../_services/applicantContacts.service";
import {ContactTypeModel} from "../../../_models/contactType.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-at-applicant-contacts-item',
  templateUrl: './at-applicant-contacts-item.component.html',
  styleUrls: ['./at-applicant-contacts-item.component.css']
})
export class AtApplicantContactsItemComponent implements OnInit {
  @Input() contact: ApplicantContactModel;
  @Input() editable: boolean;
  @Input() contactTypes: ContactTypeModel[];
  selectedContactType: ContactTypeModel;
  isEdit: boolean;

  constructor(private applicantContactsService: ApplicantContactsService) { }

  ngOnInit() {
    this.selectedContactType = this.contact.id_contact_type;
    this.isEdit = false;
  }

  onSubmit(form: NgForm){
    this.contact.contact = form.value.contact;
    this.contact.description = form.value.description;
    this.contact.id_contact_type = this.selectedContactType;
    this.applicantContactsService.updateApplicantContact(this.contact);

    this.isEdit = false;
  }

  removeContact(contact: ApplicantContactModel){
    this.applicantContactsService.removeApplicantContact(this.contact);
  }

  onTypeSelected(value: string) {
    this.selectedContactType = this.contactTypes.find(item => item.name === value);
  }
}
