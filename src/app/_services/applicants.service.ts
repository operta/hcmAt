import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import 'rxjs/Rx';
import {AuthenticationService} from "./authentication.service";
import {ApplicantModel} from "../_models/applicant.model";

@Injectable()
export class ApplicantsService {
  private applicants: ApplicantModel[];
  applicantChange= new Subject<ApplicantModel[]>();

  applicantsURL = 'http://localhost:8080/applicants';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  getApplicants() {
    this.http.get(this.applicantsURL).map(
      (response: Response) => {
        const applicants: ApplicantModel[] = response.json();
        return applicants;
      }
    ).subscribe(
      (data: ApplicantModel[]) => {
        this.applicants = data;
        this.applicantChange.next(this.applicants.slice());
      }
    );
  }

  getApplicant(id: string) {
    return this.http.get(this.applicantsURL + '/' + id).map(
      (response: Response) => {
          const applicant: ApplicantModel = response.json();
          return applicant;
      }
    );
  }

  addApplicant(applicant: ApplicantModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicant);

    this.http.post(this.applicantsURL + '/add', body, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        console.log('RESPONSE:' + response);
        // this.applicants.push(applicant);
        // this.applicantChange.next(this.applicants.slice());
      }
    );

  }

  updateApplicant(applicant: ApplicantModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicant);
    return this.http.put(this.applicantsURL, body, options)
      .map((response: Response) => response.json());
  }
}
