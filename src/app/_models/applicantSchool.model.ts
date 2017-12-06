import {SchoolModel} from "./school.model";
import {ApplicantModel} from "./applicant.model";
import {QualificationModel} from "./qualification";

export class ApplicantSchoolModel {
  public id: string;
  public id_school: SchoolModel;
  public idApplicant: ApplicantModel;
  public school: string;
  public dateFrom: Date;
  public date_to: Date;
  public major: string;
  public degree: string;
  public id_qualification: QualificationModel;
  public grade: number;
  public description: string;
  public link: string;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;

  constructor(id: string, id_school: SchoolModel, idApplicant: ApplicantModel, school: string, dateFrom: Date, date_to: Date, major: string, degree: string, id_qualification: QualificationModel, grade: number, description: string, link: string, created_by: string, created_at: Date, updated_by: string, updated_at: Date) {
    this.id = id;
    this.id_school = id_school;
    this.idApplicant = idApplicant;
    this.school = school;
    this.dateFrom = dateFrom;
    this.date_to = date_to;
    this.major = major;
    this.degree = degree;
    this.id_qualification = id_qualification;
    this.grade = grade;
    this.description = description;
    this.link = link;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
  }
}
