import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {ApplicantSchoolModel} from "../_models/applicantSchool.model";
import {ApplicantModel} from "../_models/applicant.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {JsogService} from "jsog-typescript";

@Injectable()
export class ApplicantSchoolsService {

  URL = 'http://localhost:8080/applicantSchools';
  applicantSchools: ApplicantSchoolModel[];
  applicantSchoolsObserver = new Subject<ApplicantSchoolModel[]>();

  constructor(private toastr: ToastsManager, private http: Http, private jsog: JsogService) {
  }

  getApplicantSchools(applicant: ApplicantModel){
    return this.http.get(this.URL + '/' + applicant.id).map(
      (response: Response) => {
        const applicantSchools: ApplicantSchoolModel[] = (<ApplicantSchoolModel[]>this.jsog.deserialize(response.json()));
        return applicantSchools;
      }
    ).subscribe(
      (data: ApplicantSchoolModel[]) => {
        this.applicantSchools = data;
        this.applicantSchoolsObserver.next(this.applicantSchools.slice());
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  updateApplicantSchool(applicantSchool: ApplicantSchoolModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(applicantSchool);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.applicantSchools.map(school => school.id == applicantSchool.id ? applicantSchool : school);
        this.applicantSchoolsObserver.next(this.applicantSchools.slice());
        this.toastr.success(applicantSchool.school + " successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addApplicantSchool(applicantSchool: ApplicantSchoolModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantSchool);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.applicantSchools.push(response.json());
        this.applicantSchoolsObserver.next(this.applicantSchools.slice());
        this.toastr.success(applicantSchool.school + " successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeApplicantSchool(applicantSchool: ApplicantSchoolModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantSchool.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.applicantSchools.indexOf(applicantSchool);
        this.applicantSchools.splice(index, 1);
        this.applicantSchoolsObserver.next(this.applicantSchools.slice());
        this.toastr.success(applicantSchool.school + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

}