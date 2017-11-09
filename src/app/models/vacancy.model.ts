import {WorkPlaceModel} from './workPlace.model';

export class VacancyModel {

  public id: string;
  public code: string;
  public name: string;
  public description: string;
  public id_location: string;
  public date_from: Date;
  public date_to: Date;
  public id_work_place: WorkPlaceModel;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;


  constructor(id: string, code: string, name: string, description: string, id_location: string, date_from: Date, date_to: Date, id_work_place: WorkPlaceModel, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.id_location = id_location;
    this.date_from = date_from;
    this.date_to = date_to;
    this.id_work_place = id_work_place;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
