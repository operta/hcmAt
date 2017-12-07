import {RegionModel} from './region.model';
import {JobApplicationModel} from "./jobApplication.model";

export class JobApplicationTestModel {
  public id: number;
  public score: number;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;
  public test_date: Date;
  public location_id: RegionModel;
  public job_application_id: JobApplicationModel;
  public short_description;
  public review: string;


  constructor(id: number, score: number, created_by: string, created_at: Date, updated_by: string, updated_at: Date, test_date: Date, location_id: RegionModel, job_application_id: JobApplicationModel, short_description: string, review: string) {
    this.id = id;
    this.score = score;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.test_date = test_date;
    this.location_id = location_id;
    this.job_application_id = job_application_id;
    this.short_description = short_description;
    this.review = review;
  }
}
