import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApplicantModel} from "../../_models/applicant.model";
import {ApplicantDocumentModel} from "../../_models/applicantDocument.model";
import {Subscription} from "rxjs/Subscription";
import {ApplicantDocumentsService} from "../../_services/applicantDocuments.service";
import {DocumentTypesService} from "../../_services/documentTypes.service";
import {DocumentTypeModel} from "../../_models/documentType.model";

@Component({
  selector: 'app-at-applicant-documents',
  templateUrl: './at-applicant-documents.component.html',
  styleUrls: ['./at-applicant-documents.component.css']
})
export class AtApplicantDocumentsComponent implements OnInit, OnDestroy {
  @Input() applicant: ApplicantModel;
  documents: ApplicantDocumentModel[];
  add: boolean;
  subscription: Subscription;
  documentTypes: DocumentTypeModel[];

  constructor(private applicantDocumentsService: ApplicantDocumentsService, private documentTypesService: DocumentTypesService) { }

  ngOnInit() {
    this.documentTypesService.getDocumentTypes().subscribe(
      (data: DocumentTypeModel[]) => {
        this.documentTypes = data;
        console.log(this.documentTypes);
      }
    );
    this.applicantDocumentsService.getApplicantDocuments(this.applicant);
    this.subscription = this.applicantDocumentsService.applicantDocumentsObserver.subscribe(
      (data: ApplicantDocumentModel[]) => {
        this.documents = data
        console.log(this.documents);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClose(){
    this.add = false;
  }


}
