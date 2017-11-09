export class Vacancy {

  public id: string;
  public code: string;
  public name: string;
  public description: string;
  public id_location: string;
  public date_from: string;
  public date_to: string;
  public id_work_place: string;
  public updated_at: string;

  constructor (id: string, code: string, name: string, description: string, id_location: string, date_from: string, date_to: string, id_work_place: string, updated_at: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.id_location = id_location;
    this.date_from = date_from;
    this.date_to = date_to;
    this.id_work_place = id_work_place;
    this.updated_at = updated_at;
  }
}
