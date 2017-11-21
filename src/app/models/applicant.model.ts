export class ApplicantModel {
  public id: number;
  public name: string;
  public surname: string;
  public middle_name: string;
  public maiden_name: string;
  public gender: string;
  public birthdate: Date;
  public marital_status: string;
  public id_country: number;
  public id_region: number;
  public id_city: number;
  public address: string;
  public id_employee: number;
  public description: string;
  public employment_position: string;
  public industry: string;
  public id_user: number;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;
  public phone_number: string;
  public email: string;

  constructor(id: number, name: string, surname: string, middle_name: string, maiden_name: string, gender: string, birthdate: Date, marital_status: string, id_country: number, id_region: number, id_city: number, address: string, id_employee: number, description: string, employment_position: string, industry: string, id_user: number, created_by: string, created_at: Date, updated_by: string, updated_at: Date, phone_number: string, email: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.middle_name = middle_name;
    this.maiden_name = maiden_name;
    this.gender = gender;
    this.birthdate = birthdate;
    this.marital_status = marital_status;
    this.id_country = id_country;
    this.id_region = id_region;
    this.id_city = id_city;
    this.address = address;
    this.id_employee = id_employee;
    this.description = description;
    this.employment_position = employment_position;
    this.industry = industry;
    this.id_user = id_user;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.phone_number = phone_number;
    this.email = email;
  }
}
