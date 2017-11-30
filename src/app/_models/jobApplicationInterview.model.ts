import {RegionModel} from './region.model';

export class JobApplicationInterviewModel {
  public id: number;
  public grade: number;
  public description: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;
  public location_id: RegionModel;
  public interview_date: Date;


  constructor(id: number, grade: number, description: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date, location_id: RegionModel, interview_date: Date) {
    this.id = id;
    this.grade = grade;
    this.description = description;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.location_id = location_id;
    this.interview_date = interview_date;
  }
}
