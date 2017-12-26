import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {ApplicantModel} from "../_models/applicant.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {JsogService} from "jsog-typescript";
import {ApplicantSkillModel} from "../_models/applicantSkill.model";
import {LanguageService} from "./language.service";

@Injectable()
export class ApplicantSkillsService {

  URL = 'http://localhost:8080/applicantSkills';
  applicantSkills: ApplicantSkillModel[];
  applicantSkillsObserver = new Subject<ApplicantSkillModel[]>();
  language = 'en';

  constructor(private toastr: ToastsManager,
              private http: Http,
              private jsog: JsogService,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getApplicantSkills(applicant: ApplicantModel){
    return this.http.get(this.URL + '/' + applicant.id).map(
      (response: Response) => {
        const applicantSkills: ApplicantSkillModel[] = (<ApplicantSkillModel[]>this.jsog.deserialize(response.json()));
        return applicantSkills;
      }
    ).subscribe(
      (data: ApplicantSkillModel[]) => {
        this.applicantSkills = data;
        this.applicantSkillsObserver.next(this.applicantSkills.slice());
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }

  updateApplicantSkill(applicantSkill: ApplicantSkillModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(applicantSkill);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.applicantSkills.map(skill => skill.id == applicantSkill.id ? applicantSkill : skill);
        this.applicantSkillsObserver.next(this.applicantSkills.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantSkill.skill + " successfully updated.");
        } else {
          this.toastr.success(applicantSkill.skill + "تم التحديث بنجاح");
        }
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }

  addApplicantSkill(applicantSkill: ApplicantSkillModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantSkill);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.applicantSkills.push(response.json());
        this.applicantSkillsObserver.next(this.applicantSkills.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantSkill.skill + " successfully added.");
        } else {
          this.toastr.success(applicantSkill.skill + "تم الاضافة بنجاح");
        }
      }
    ).catch(
      (error: any) => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeApplicantSkill(applicantSkill: ApplicantSkillModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantSkill.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        const index = this.applicantSkills.indexOf(applicantSkill);
        this.applicantSkills.splice(index, 1);
        this.applicantSkillsObserver.next(this.applicantSkills.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantSkill.skill + " successfully removed.");
        } else {
          this.toastr.success(applicantSkill.skill + "تم الازالة بنجاح");
        }
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }

}
