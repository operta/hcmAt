import {LegalEntityModel} from './legalEntity.model';

export class OrganizationModel {
  public id: number;
  public code: string;
  public name: string;
  public description: string;
  public id_legal_enitity: LegalEntityModel;
  public id_parent: OrganizationModel;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;


  constructor(id: number, code: string, name: string, description: string, id_legal_enitity: LegalEntityModel, id_parent: OrganizationModel, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.id_legal_enitity = id_legal_enitity;
    this.id_parent = id_parent;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
