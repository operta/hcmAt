import {RegionModel} from "./region.model";

export class SchoolModel {
  public id: string;
  public code: string;
  public name: string;
  public description: string;
  public address: string;
  public id_city: RegionModel;
  public id_country: RegionModel;
  public id_region: RegionModel;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: string, code: string, name: string, description: string, address: string, id_city: RegionModel, id_country: RegionModel, id_region: RegionModel, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.address = address;
    this.id_city = id_city;
    this.id_country = id_country;
    this.id_region = id_region;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
