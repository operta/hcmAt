import {ApplicantModel} from "./applicant.model";
import {DocumentLinkModel} from "./documentLink.model";
import {DocumentTypeModel} from "./documentType.model";

export class ApplicantDocumentModel {
  public id: string;
  public idApplicant: ApplicantModel;
  public id_document_link: DocumentLinkModel;
  public id_document_type: DocumentTypeModel;
  public name: string;
  public description: string;
  public valid_from: Date;
  public valid_to: Date;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: string, idApplicant: ApplicantModel, id_document_link: DocumentLinkModel, id_document_type: DocumentTypeModel, name: string, description: string, valid_from: Date, valid_to: Date, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.idApplicant = idApplicant;
    this.id_document_link = id_document_link;
    this.id_document_type = id_document_type;
    this.name = name;
    this.description = description;
    this.valid_from = valid_from;
    this.valid_to = valid_to;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
