import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import 'rxjs/Rx';
import {AuthenticationService} from "./authentication.service";
import {ApplicantModel} from "../_models/applicant.model";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ApplicantsService {
  private applicants: ApplicantModel[];
  applicantChange= new Subject<ApplicantModel[]>();

  applicantsURL = 'http://localhost:8080/applicants';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private toastr: ToastsManager, private http: Http, private authenticationService: AuthenticationService) { }

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
      },
      error => {
        this.toastr.error( error.status, "An error occured");
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

  getApplicantByApplicantId(id: string) {
    return this.http.get(this.applicantsURL + '/applicant/' + id).map(
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

    return this.http.post(this.applicantsURL + '/add', body, options).map(
      (response: Response) => {

        //
        // this.applicants.push(response.json());
        // this.applicantChange.next(this.applicants.slice());
        this.toastr.success("Applicant profile successfully created.");
        return response.json();
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    );

  }

  updateApplicant(applicant: ApplicantModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicant);
    return this.http.put(this.applicantsURL, body, options).map(
      (response: Response) => response.json()
      ).subscribe(
        response => {
          this.applicants.map(item => item.id == applicant.id ? item : applicant);
          this.applicantChange.next(this.applicants.slice());
          this.toastr.success("Applicant profile successfully updated.");
        },
        error => {
          this.toastr.error( error.status, "An error occured");
        }
      );
  }
}
