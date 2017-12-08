import {Component, Input, OnInit} from '@angular/core';
import {ApplicantDocumentModel} from "../../../_models/applicantDocument.model";
import {ApplicantDocumentsService} from "../../../_services/applicantDocuments.service";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-at-applicant-documents-item',
  templateUrl: './at-applicant-documents-item.component.html',
  styleUrls: ['./at-applicant-documents-item.component.css']
})
export class AtApplicantDocumentsItemComponent implements OnInit {
  @Input() document: ApplicantDocumentModel;

  file: Blob;
  fileURL: string;

  constructor(private applicantDocumentsService: ApplicantDocumentsService) { }

  ngOnInit() {
    var byteCharacters = atob(this.document.id_document_link.document_blob);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    this.file = new Blob([byteArray], { type: this.document.id_document_type.name });
    this.fileURL = URL.createObjectURL(this.file);

  }

  openFile(){
    window.open(this.fileURL)
  }

  saveFile(){
    FileSaver.saveAs(this.file, this.document.name);
  }

  removeDocument(document: ApplicantDocumentModel){
    this.applicantDocumentsService.removeApplicantDocument(document);
  }


}
