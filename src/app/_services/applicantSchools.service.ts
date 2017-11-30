import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {ApplicantSchoolModel} from "../_models/applicantSchool.model";
import {ApplicantModel} from "../_models/applicant.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ApplicantSchoolsService {

  URL = 'http://localhost:8080/applicantSchools';
  applicantSchools: ApplicantSchoolModel[];
  applicantSchoolsObserver = new Subject<ApplicantSchoolModel[]>();

  constructor(private http: Http) {
  }

  getApplicantSchools(applicant: ApplicantModel){
    return this.http.get(this.URL + '/' + applicant.id).map(
      (response: Response) => {
        const applicantSchools: ApplicantSchoolModel[] = response.json();
        return applicantSchools;
      }
    ).subscribe(
      (data: ApplicantSchoolModel[]) => {
        this.applicantSchools = data;
        this.applicantSchoolsObserver.next(this.applicantSchools);
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
        this.applicantSchoolsObserver.next(this.applicantSchools);
      }
    );
  }

  addApplicantSchool(applicantSchool: ApplicantSchoolModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantSchool);

    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        this.applicantSchools.push(applicantSchool);
        this.applicantSchoolsObserver.next(this.applicantSchools);
      }
    );

  }

}
