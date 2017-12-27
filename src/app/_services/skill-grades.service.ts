import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {SkillGradeModel} from "../_models/skill-grade.model";
import {ToastsManager} from "ng2-toastr";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {LanguageService} from "./language.service";

@Injectable()
export class SkillGradesService {
  URL = 'http://77.78.198.19:8080/skillGrades';
  skillGrades: SkillGradeModel[];
  skillGradesObserver = new Subject<SkillGradeModel[]>();
  language = 'en';

  constructor(private toastr: ToastsManager,
              private http: Http,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getSkillGrades() {
    return this.http.get(this.URL).map(
      (response: Response) => {
        const skillGrades: SkillGradeModel[] = response.json();
        return skillGrades;
      }
    ).subscribe(
      (data: SkillGradeModel[]) => {
        this.skillGrades = data;
        this.skillGradesObserver.next(this.skillGrades.slice());
      }
    );
  }

  updateSkillGrade(skillGrade: SkillGradeModel) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(skillGrade);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.skillGrades.map(item => skillGrade.id == item.id ? skillGrade : item);
        this.skillGradesObserver.next(this.skillGrades.slice());
        if (this.language == 'en') {
          this.toastr.success(skillGrade.name + " successfully updated.");
        } else {
          this.toastr.success(skillGrade.name + " تم التحديث بنجاح");
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

  addSkillGrade(skillGrade: SkillGradeModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(skillGrade);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.skillGrades.push(response.json());
        this.skillGradesObserver.next(this.skillGrades.slice());
        if (this.language == 'en') {
          this.toastr.success(skillGrade.name + " successfully added.");
        } else {
          this.toastr.success(skillGrade.name + " تم الاضافة بنجاح");
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

  removeSkillGrade(skillGrade: SkillGradeModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + skillGrade.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        const index = this.skillGrades.indexOf(skillGrade);
        this.skillGrades.splice(index, 1);
        this.skillGradesObserver.next(this.skillGrades.slice());
        if (this.language == 'en') {
          this.toastr.success(skillGrade.name + " successfully removed.");
        } else {
          this.toastr.success(skillGrade.name + " تم الازالة بنجاح");
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
