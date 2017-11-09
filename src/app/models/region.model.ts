export class Region {
  private id: string;
  private code: string;
  private name: string;
  private description: string;
  private type: string;
  private parent: string;
  public created_by: string;
  public created_at: string;
  public updated_by: string;
  public updated_at: string;


  constructor(id: string, code: string, name: string, description: string, type: string, parent: string, created_by: string, created_at: string, updated_by: string, updated_at: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.type = type;
    this.parent = parent;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
