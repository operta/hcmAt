export class VacanciesStatusModel {
  public id: number;
  public status: string;


  constructor(id: number, status: string) {
    this.id = id;
    this.status = status;
  }
}
