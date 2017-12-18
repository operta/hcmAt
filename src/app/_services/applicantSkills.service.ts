import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {ApplicantModel} from "../_models/applicant.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {JsogService} from "jsog-typescript";
import {ApplicantSkillModel} from "../_models/applicantSkill.model";

@Injectable()
export class ApplicantSkillsService {

  URL = 'http://77.78.198.19:8080/applicantSkills';
  applicantSkills: ApplicantSkillModel[];
  applicantSkillsObserver = new Subject<ApplicantSkillModel[]>();

  constructor(private toastr: ToastsManager, private http: Http, private jsog: JsogService) {
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
        this.toastr.error( error.status, "An error occured");
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
        this.toastr.success(applicantSkill.skill + " successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
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
        this.toastr.success(applicantSkill.skill + " successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
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
        let index = this.applicantSkills.indexOf(applicantSkill);
        this.applicantSkills.splice(index, 1);
        this.applicantSkillsObserver.next(this.applicantSkills.slice());
        this.toastr.success(applicantSkill.skill + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

}
