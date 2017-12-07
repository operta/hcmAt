import {RegionModel} from './region.model';

export class JobApplicationTestModel {
  public id: number;
  public score: number;
  public name: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;
  public location_id: RegionModel;
  public test_date: Date;


  constructor(id: number, score: number, name: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date, location_id: RegionModel, test_date: Date) {
    this.id = id;
    this.score = score;
    this.name = name;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.location_id = location_id;
    this.test_date = test_date;
  }
}
