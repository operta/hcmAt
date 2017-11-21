export class ApplicantModel {
  public id: string;
  public name: string;
  public surname: string;
  public middle_name: string;
  public maiden_name: string;
  public gender: string;
  public birthdate: Date;
  public martial_status: string;
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


  constructor(id: string, name: string, surname: string, middle_name: string, maiden_name: string, gender: string, birthdate: Date, martial_status: string, address: string, employed: string, description: string, employment_position: string, industry: string, phone_number: string, email: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.middle_name = middle_name;
    this.maiden_name = maiden_name;
    this.gender = gender;
    this.birthdate = birthdate;
    this.martial_status = martial_status;
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
  }
}
