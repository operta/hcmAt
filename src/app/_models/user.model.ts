import {UserStatus} from "./userStatus.model";

export class UserModel{

  public id: string;
  public name: string;
  public username: string;
  public password: string;
  public role: string;
  public id_status: UserStatus;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: string, name: string, username: string, password: string, role: string, id_status: UserStatus, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.role = role;
    this.id_status = id_status;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
