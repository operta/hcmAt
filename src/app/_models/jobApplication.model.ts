import {ApplicantModel} from './applicant.model';
import {VacancyModel} from './vacancy.model';
import {JobApplicationTestModel} from "./jobApplicationTest.model";
import {JobApplicationInterviewModel} from "./jobApplicationInterview.model";

export class JobApplicationModel {
  public id: number;
  public id_applicant: ApplicantModel[];
  public id_vacancies: VacancyModel;
  public id_status: number;
  public grade: number;
  public review: string;
  public date_applied: Date;
  public created_by: string;
  public created_at: Date;
  public updated_by: string;
  public updated_at: Date;
  public test: JobApplicationTestModel[];
  public interview: JobApplicationInterviewModel[];
  public interview_grade: number;
  public test_grade: number;


  constructor(id: number, id_applicant: ApplicantModel[], id_vacancies: VacancyModel, id_status: number, grade: number, review: string, date_applied: Date, created_by: string, created_at: Date, updated_by: string, updated_at: Date, test: JobApplicationTestModel[], interview: JobApplicationInterviewModel[], interview_grade: number, test_grade: number) {
    this.id = id;
    this.id_applicant = id_applicant;
    this.id_vacancies = id_vacancies;
    this.id_status = id_status;
    this.grade = grade;
    this.review = review;
    this.date_applied = date_applied;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.test = test;
    this.interview = interview;
    this.interview_grade = interview_grade;
    this.test_grade = test_grade;
  }
}