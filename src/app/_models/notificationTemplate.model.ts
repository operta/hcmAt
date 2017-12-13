export class NotificationTemplateModel {
  public id: number;
  public code: string;
  public subject: string;
  public template: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: number, code: string, subject: string, template: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.code = code;
    this.subject = subject;
    this.template = template;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
