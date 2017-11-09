export class Region {
  private id: string;
  private code: string;
  private name: string;
  private description: string;
  private type: string;
  private parent: string;


  constructor(id: string, code: string, name: string, description: string, type: string, parent: string) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.type = type;
    this.parent = parent;
  }
}
