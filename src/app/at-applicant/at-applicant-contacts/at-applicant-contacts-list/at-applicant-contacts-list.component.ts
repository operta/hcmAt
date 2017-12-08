import {Component, Input, OnInit} from '@angular/core';
import {ApplicantContactModel} from "../../../_models/applicantContact.model";
import {ContactTypeModel} from "../../../_models/contactType.model";

@Component({
  selector: 'app-at-applicant-contacts-list',
  templateUrl: './at-applicant-contacts-list.component.html',
  styleUrls: ['./at-applicant-contacts-list.component.css']
})
export class AtApplicantContactsListComponent implements OnInit {
  @Input() contacts: ApplicantContactModel[];
  @Input() editable: boolean;
  @Input() contactTypes: ContactTypeModel[];

  constructor() { }

  ngOnInit() {
  }

}
