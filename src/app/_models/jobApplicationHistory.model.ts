import {JobApplicationModel} from "./jobApplication.model";
import {JobApplicationStatusModel} from "./jobApplicationStatus.model";

export class JobApplicationHistoryModel {
  public id: string;
  public idJobApplication: JobApplicationModel;
  public id_status_from: JobApplicationStatusModel;
  public id_status_to: JobApplicationStatusModel;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: string, idJobApplication: JobApplicationModel, id_status_from: JobApplicationStatusModel, id_status_to: JobApplicationStatusModel, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.idJobApplication = idJobApplication;
    this.id_status_from = id_status_from;
    this.id_status_to = id_status_to;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
