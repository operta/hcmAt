import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Skill } from '../rg-skills/skill';
import { SkillGrade } from './skill-grade';

@Injectable()
export class SkillGradesService {
  private skillGradesUrl = 'http://localhost:8080/rgSkills';  //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) { }
  
  getSkillGrades(selectedSkill: Skill): Promise<SkillGrade[]> {
    if (selectedSkill.id) {
      const url = `${this.skillGradesUrl}/${selectedSkill.id}/rgSkillGrades`;
      return this.http.get(url)
                .toPromise()
                .then(response => response.json() as SkillGrade[])
                .catch(this.handleError);
    }
  }

  getSkill(selectedSkill: Skill, id: number): Promise<SkillGrade> {
    if (selectedSkill) {
      const url = `${this.skillGradesUrl}/${selectedSkill.id}/rgSkillGrades/${id}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json() as SkillGrade)
          .catch(this.handleError);
    }
  }
    
  update(selectedSkill: Skill, skillGrade: SkillGrade): Promise<SkillGrade> {
    if (selectedSkill) {
      const url = `${this.skillGradesUrl}/${selectedSkill.id}/rgSkillGrades/${skillGrade.id}`;
      return this.http
        .put(url, JSON.stringify(skillGrade), {headers: this.headers})
        .toPromise()
        .then(() => skillGrade)
        .catch(this.handleError);
    }
  }

  create(code: string, name: string, description: string, grade: number, numerical: string, idSkill: number): Promise<SkillGrade> {
    if (idSkill) {
      const url = `${this.skillGradesUrl}/${idSkill}/rgSkillGrades`;
      return this.http
        .post(url, JSON.stringify({code: code, name: name, description: description, grade: grade, 
            numerical: numerical, idSkill: idSkill}), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as SkillGrade)
        .catch(this.handleError);
    }
  }

  delete(selectedSkill: Skill, id: number): Promise<void> {
    if (selectedSkill) {
      const url = `${this.skillGradesUrl}/${selectedSkill.id}/rgSkillGrades/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); //for demo purposes only
    return Promise.reject(error.message || error);
  }
}