import {Component, Input, OnInit} from '@angular/core';
import {ApplicantModel} from "../../_models/applicant.model";
import {Subscription} from "rxjs/Subscription";
import {ContactTypesService} from "../../_services/contactTypes.service";
import {ContactTypeModel} from "../../_models/contactType.model";
import {ApplicantContactsService} from "../../_services/applicantContacts.service";
import {ApplicantContactModel} from "../../_models/applicantContact.model";

@Component({
  selector: 'app-at-applicant-contacts',
  templateUrl: './at-applicant-contacts.component.html',
  styleUrls: ['./at-applicant-contacts.component.css']
})
export class AtApplicantContactsComponent implements OnInit {
  @Input() applicant: ApplicantModel;
  @Input() editable: boolean;
  contacts: ApplicantContactModel[];
  contactTypes: ContactTypeModel[];
  add: boolean;
  subscription: Subscription;

  constructor(private contactTypeService: ContactTypesService, private applicantContactsService: ApplicantContactsService) { }

  ngOnInit() {
    this.contactTypeService.getContactTypes().subscribe(
      (data: ContactTypeModel[]) => {
        this.contactTypes = data;
      }
    );
    this.applicantContactsService.getApplicantContacts(this.applicant);
    this.subscription = this.applicantContactsService.applicantContactsObserver.subscribe(
      (data: ApplicantContactModel[]) => {
        this.contacts = data
      }
    );
  }

  onClose() {
    this.add = false;
  }

}
