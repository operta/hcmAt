import {Component, Input, OnInit} from '@angular/core';
import {ApplicantDocumentModel} from "../../../_models/applicantDocument.model";

@Component({
  selector: 'app-at-applicant-documents-list',
  templateUrl: './at-applicant-documents-list.component.html',
  styleUrls: ['./at-applicant-documents-list.component.css']
})
export class AtApplicantDocumentsListComponent implements OnInit {
  @Input() documents: ApplicantDocumentModel[];
  @Input() editable: boolean;
  constructor() { }

  ngOnInit() {
  }

}
