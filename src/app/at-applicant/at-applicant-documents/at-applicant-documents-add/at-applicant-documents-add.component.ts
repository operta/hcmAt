import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicantModel} from "../../../_models/applicant.model";
import {NgForm} from "@angular/forms";
import {DocumentLinkModel} from "../../../_models/documentLink.model";
import {DocumentLinksService} from "../../../_services/documentLinks.service";
import {ApplicantDocumentModel} from "../../../_models/applicantDocument.model";
import {ApplicantDocumentsService} from "../../../_services/applicantDocuments.service";
import {DocumentTypeModel} from "../../../_models/documentType.model";

@Component({
  selector: 'app-at-applicant-documents-add',
  templateUrl: './at-applicant-documents-add.component.html',
  styleUrls: ['./at-applicant-documents-add.component.css']
})
export class AtApplicantDocumentsAddComponent implements OnInit {
  @Input() applicant: ApplicantModel;
  @Input() documentTypes: DocumentTypeModel[];
  @Output() onClose = new EventEmitter();
  files: FileList;
  fileName: string;
  filestring: string;
  binaryString: string;
  document: DocumentLinkModel;
  description: string;
  validTo: Date;
  validFrom: Date;
  selectedDocument: DocumentTypeModel;

  constructor(private documentLinksService: DocumentLinksService, private applicantDocumentsService: ApplicantDocumentsService) { }

  ngOnInit() {
    this.selectedDocument = this.documentTypes[0];
  }

  onFileChange(event) {
    this.files = event.target.files;
    this.fileName = this.files[0].name;
    var reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }

  handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    this.filestring = btoa(this.binaryString);
  }

  close(){
    this.onClose.emit();
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    this.document = new DocumentLinkModel(
      null,
      form.value.document_name,
      this.fileName,
      null,
      null,
      this.filestring,
      null,
      new Date,
      null,
      new Date
    );
    this.description = form.value.description;
    this.validTo = form.value.valid_to;
    this.validFrom = form.value.valid_from;

    this.documentLinksService.addDocument(this.document).subscribe(
      (data: DocumentLinkModel) => {
        this.document = data;
        console.log("HERE");
        console.log(form.value);
        var applicantDocument = new ApplicantDocumentModel(
          null,
          this.applicant,
          this.document,
          this.selectedDocument,
          this.document.document_name,
          this.description,
          this.validFrom,
          this.validTo,
          null,
          new Date,
          null,
          new Date
        );
        console.log(applicantDocument);
        this.applicantDocumentsService.addApplicantDocument(applicantDocument);
      }
    );





    this.close();
  }

}
