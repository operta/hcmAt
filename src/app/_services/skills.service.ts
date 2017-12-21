import 'rxjs/add/operator/toPromise';

import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { SkillModel} from '../_models/skill.model';
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SkillsService {
  URL = 'http://localhost:8080/skills';
  skills: SkillModel[];
  skillsObserver = new Subject<SkillModel[]>();

  constructor(private toastr: ToastsManager, private http: Http) {
  }

  getSkills(){
    return this.http.get(this.URL).map(
      (response: Response) => {
        const skills: SkillModel[] = response.json();
        return skills;
      }
    ).subscribe(
      (data: SkillModel[]) => {
        this.skills = data;
        this.skillsObserver.next(this.skills.slice());
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  updateSkill(skill: SkillModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(skill);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.skills.map(skill => skill.id == skill.id ? skill : skill);
        this.skillsObserver.next(this.skills.slice());
        this.toastr.success(skill.name + " successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addSkill(skill: SkillModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(skill);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.skills.push(response.json());
        this.skillsObserver.next(this.skills.slice());
        this.toastr.success(skill.name + " successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeSkill(skill: SkillModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + skill.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.skills.indexOf(skill);
        this.skills.splice(index, 1);
        this.skillsObserver.next(this.skills.slice());
        this.toastr.success(skill.name + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }
}
