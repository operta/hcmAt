export class LegalEntityModel {
  public id: number;
  public code: string;
  public name: string;
  public id_number: string;
  public duty_number: string;
  public country: number;
  public region: number;
  public city: number;
  public address: string;
  public postal_number: string;
  public id_entity_type: number;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;


  constructor(id: number, code: string, name: string, id_number: string, duty_number: string, country: number, region: number, city: number, address: string, postal_number: string, id_entity_type: number, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.id_number = id_number;
    this.duty_number = duty_number;
    this.country = country;
    this.region = region;
    this.city = city;
    this.address = address;
    this.postal_number = postal_number;
    this.id_entity_type = id_entity_type;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
