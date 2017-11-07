export class Vacancy {

  public id: string;
  public code: string;
  public name: string;
  public description: string;
  public location: string;
  public date_from: string;
  public date_to: string;
  public workPlace: string;
  public updated_at: string;

  constructor (id: string, code: string, name: string, description: string, location: string, date_from: string, date_to: string, workPlace: string, updated_at: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.location = location;
    this.date_from = date_from;
    this.date_to = date_to;
    this.workPlace = workPlace;
    this.updated_at = updated_at;
  }
}
