import 'rxjs/add/operator/toPromise';

import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Skill } from './skill';

@Injectable()
export class SkillsService {
  private skillsUrl = 'http://localhost:8080/rgSkills';  //URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  skillSelected = new EventEmitter<Skill>();

  constructor(private http: Http) { }
  
  getSkills(): Promise<Skill[]> {
    return this.http.get(this.skillsUrl)
               .toPromise()
               .then(response => response.json() as Skill[])
               .catch(this.handleError);
  }

  getSkill(id: number): Promise<Skill> {
    const url = `${this.skillsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Skill)
        .catch(this.handleError);
  }
    
  update(skill: Skill): Promise<Skill> {
      const url = `${this.skillsUrl}/${skill.id}`;
      return this.http
        .put(url, JSON.stringify(skill), {headers: this.headers})
        .toPromise()
        .then(() => skill)
        .catch(this.handleError);
  }

  create(code: string, name: string, description: string, field: string): Promise<Skill> {
      return this.http
        .post(this.skillsUrl, JSON.stringify({code: code, name: name, description: description, field: field}), 
            {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Skill)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
      const url = `${this.skillsUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); //for demo purposes only
    return Promise.reject(error.message || error);
  }
}