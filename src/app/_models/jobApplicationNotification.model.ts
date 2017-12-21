import {JobApplicationModel} from "./jobApplication.model";
import {NotificationTemplateModel} from "./notificationTemplate.model";

export class JobApplicationNotificationModel {
  public id: string;
  public idJobApplication: JobApplicationModel;
  public id_notification: NotificationTemplateModel;
  public dateSent: Date;
  public is_active: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: string, idJobApplication: JobApplicationModel, id_notification: NotificationTemplateModel, dateSent: Date, is_active: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.idJobApplication = idJobApplication;
    this.id_notification = id_notification;
    this.dateSent = dateSent;
    this.is_active = is_active;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}

