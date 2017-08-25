export class Applicant {
  public id: number;
  public name: string;
  public gender: string;
  public dateOfBirth: string;
  public address: string;
  public city: string;
  public state: string;
  public country: string;
  public qualification: string;
  public industry: string;
  public employed: string;

  constructor(id: number, name: string, gender: string, dateOfBirth: string, address: string, 
               city: string, state: string, country: string, qualification: string, 
               industry: string, employed: string) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.qualification = qualification;
    this.industry = industry;
    this.employed = employed;
  }
}