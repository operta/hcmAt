import {UserModel} from "./user.model";
import {RegionModel} from "./region.model";

export class ApplicantModel {
  public id: number;
  public name: string;
  public surname: string;
  public marital_status: string;
  public middle_name: string;
  public maiden_name: string;
  public gender: string;
  public birthdate: Date;
  public address: string;
  public employed: string;
  public description: string;
  public employment_position: string;
  public industry: string;
  public phone_number: string;
  public email: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;
  public id_city: RegionModel;
  public id_region: RegionModel;
  public id_country: RegionModel;
  public id_user: UserModel;

  constructor(id: number, name: string, surname: string, marital_status: string, middle_name: string, maiden_name: string, gender: string, birthdate: Date, address: string, employed: string, description: string, employment_position: string, industry: string, phone_number: string, email: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date, id_city: RegionModel, id_region: RegionModel, id_country: RegionModel, id_user: UserModel) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.marital_status = marital_status;
    this.middle_name = middle_name;
    this.maiden_name = maiden_name;
    this.gender = gender;
    this.birthdate = birthdate;
    this.address = address;
    this.employed = employed;
    this.description = description;
    this.employment_position = employment_position;
    this.industry = industry;
    this.phone_number = phone_number;
    this.email = email;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.id_city = id_city;
    this.id_region = id_region;
    this.id_country = id_country;
    this.id_user = id_user;
  }
}
