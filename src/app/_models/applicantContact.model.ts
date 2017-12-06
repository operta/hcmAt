import {ApplicantModel} from "./applicant.model";
import {ContactTypeModel} from "./contactType.model";

export class ApplicantContactModel{
  public id: string;
  public idApplicant: ApplicantModel;
  public id_contact_type: ContactTypeModel;
  public contact: string;
  public description: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: string, idApplicant: ApplicantModel, id_contact_type: ContactTypeModel, contact: string, description: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.idApplicant = idApplicant;
    this.id_contact_type = id_contact_type;
    this.contact = contact;
    this.description = description;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
