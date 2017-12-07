import {ApplicantModel} from "./applicant.model";
import {SkillModel} from "./skill.model";
import { SkillGradeModel} from "./skill-grade.model";

export class ApplicantSkillModel {
  public id: string;
  public idApplicant: ApplicantModel;
  public id_skill: SkillModel;
  public skill: string;
  public date_skill: Date;
  public id_grade: SkillGradeModel;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;


  constructor(id: string, idApplicant: ApplicantModel, id_skill: SkillModel, skill: string, date_skill: Date, id_grade: SkillGradeModel, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.idApplicant = idApplicant;
    this.id_skill = id_skill;
    this.skill = skill;
    this.date_skill = date_skill;
    this.id_grade = id_grade;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
