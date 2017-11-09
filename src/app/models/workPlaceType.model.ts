export class WorkPlaceTypeModel {
  public id: number;
  public code: string;
  public name: string;
  public description: string;
  public created_by: string;
  public created_at: string;
  public updated_by: string;
  public updated_at: string;


  constructor(id: number, code: string, name: string, description: string, created_by: string, created_at: string, updated_by: string, updated_at: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
