import {RegionTypeModel} from "./regionType.model";

export class RegionModel {
  public id: string;
  public code: string;
  public name: string;
  public description: string;
  public idType: RegionTypeModel;
  public id_parent: RegionModel;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;


  constructor(id: string, code: string, name: string, description: string, idType: RegionTypeModel, id_parent: RegionModel, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.idType = idType;
    this.id_parent = id_parent;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
