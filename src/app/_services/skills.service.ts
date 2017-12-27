import 'rxjs/add/operator/toPromise';

import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { SkillModel} from '../_models/skill.model';
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {LanguageService} from "./language.service";

@Injectable()
export class SkillsService {
  URL = 'http://77.78.198.19:8080/skills';
  skills: SkillModel[];
  skillsObserver = new Subject<SkillModel[]>();
  language = 'en';

  constructor(private toastr: ToastsManager,
              private http: Http,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getSkills() {
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
        if (this.language == 'en') {
          this.toastr.error(error.status, "An error occured");
        } else {
          this.toastr.error(error.status, "تم حدوث خط");
        }
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
        if (this.language == 'en') {
          this.toastr.success(skill.name + " successfully updated.");
        } else {
          this.toastr.success(skill.name + " تم التحديث بنجاح");
        }
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error(error.status, "An error occured");
        } else {
          this.toastr.error(error.status, "تم حدوث خط");
        }
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
        if (this.language == 'en') {
          this.toastr.success(skill.name + " successfully added.");
        } else {
          this.toastr.success(skill.name + " تم الاضافة بنجاح");
        }
      }
    ).catch(
      (error: any) => {
        if (this.language == 'en') {
          this.toastr.error(error.status, "An error occured");
        } else {
          this.toastr.error(error.status, "تم حدوث خط");
        }
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
        const index = this.skills.indexOf(skill);
        this.skills.splice(index, 1);
        this.skillsObserver.next(this.skills.slice());
        if (this.language == 'en') {
          this.toastr.success(skill.name + " successfully removed.");
        } else {
          this.toastr.success(skill.name + " تم الازالة بنجاح");
        }

      },
      error => {
        if (this.language == 'en') {
          this.toastr.error(error.status, "An error occured");
        } else {
          this.toastr.error(error.status, "تم حدوث خط");
        }
      }
    );
  }
}
