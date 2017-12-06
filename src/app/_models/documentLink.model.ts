export class DocumentLinkModel {
  public id: string;
  public document_name: string;
  public file_name: string;
  public file_path: string;
  public uri: string;
  public document_blob: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;


  constructor(id: string, document_name: string, file_name: string, file_path: string, uri: string, document_blob: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.document_name = document_name;
    this.file_name = file_name;
    this.file_path = file_path;
    this.uri = uri;
    this.document_blob = document_blob;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
