import {ApplicantModel} from "./applicant.model";

export class ApplicantExperienceModel {
  public id: string;
  public idApplicant: ApplicantModel;
  public company: string;
  public position: string;
  public location: string;
  public ongoing: string;
  public date_from: Date;
  public date_to: Date;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;


  constructor(id: string, idApplicant: ApplicantModel, company: string, position: string, location: string, ongoing: string, date_from: Date, date_to: Date, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.idApplicant = idApplicant;
    this.company = company;
    this.position = position;
    this.location = location;
    this.ongoing = ongoing;
    this.date_from = date_from;
    this.date_to = date_to;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
