import {ApplicantModel} from "./applicant.model";
import {AccomplishmentTypeModel} from "./accomplishmentType.model";

export class ApplicantAccomplishmentModel {
  public id: string;
  public idApplicant: ApplicantModel;
  public id_accomplishment_type: AccomplishmentTypeModel;
  public title: string;
  public description: string;
  public organization: string;
  public location: string;
  public association: string;
  public ongoing: string;
  public link: string;
  public date_from: Date;
  public date_to: Date;
  public proficiency: string;
  public occupation: string;
  public licence_number: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: string, idApplicant: ApplicantModel, id_accomplishment_type: AccomplishmentTypeModel, title: string, description: string, organization: string, location: string, association: string, ongoing: string, link: string, date_from: Date, date_to: Date, proficiency: string, occupation: string, licence_number: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.idApplicant = idApplicant;
    this.id_accomplishment_type = id_accomplishment_type;
    this.title = title;
    this.description = description;
    this.organization = organization;
    this.location = location;
    this.association = association;
    this.ongoing = ongoing;
    this.link = link;
    this.date_from = date_from;
    this.date_to = date_to;
    this.proficiency = proficiency;
    this.occupation = occupation;
    this.licence_number = licence_number;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
