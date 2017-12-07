import {RegionModel} from './region.model';
import {JobApplicationModel} from './jobApplication.model';

export class JobApplicationInterviewModel {
  public id: number;
  public grade: number;
  public description: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;
  public interview_date: Date;
  public job_application_id: JobApplicationModel;
  public location_id: RegionModel;


  constructor(id: number, grade: number, description: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date, interview_date: Date, job_application_id: JobApplicationModel, location_id: RegionModel) {
    this.id = id;
    this.grade = grade;
    this.description = description;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.interview_date = interview_date;
    this.job_application_id = job_application_id;
    this.location_id = location_id;
  }
}
