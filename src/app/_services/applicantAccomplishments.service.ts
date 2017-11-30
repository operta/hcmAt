import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {ApplicantModel} from "../_models/applicant.model";
import {ApplicantAccomplishmentModel} from "../_models/applicantAccomplishment.model";
import {JsogService} from "jsog-typescript";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ApplicantAccomplishmentsService {

  URL = 'http://localhost:8080/applicantAccomplishments';
  accomplishments: ApplicantAccomplishmentModel[];
  accomplishmentsObserver= new Subject<ApplicantAccomplishmentModel[]>();

  constructor(private http: Http, private jsog: JsogService) {}

  getApplicantAccomplishments(applicant: ApplicantModel){
    return this.http.get(this.URL + '/' + applicant.id).map(
      (response: Response) => {
        const applicantAccomplishments: ApplicantAccomplishmentModel[] = (<ApplicantAccomplishmentModel[]>this.jsog.deserialize(response.json()));;
        return applicantAccomplishments;
      }
    ).subscribe(
      (data: ApplicantAccomplishmentModel[]) => {
        this.accomplishments = data;
        this.accomplishmentsObserver.next(this.accomplishments.slice());
      }
    );
  }

  updateApplicantAccomplishment(applicantAccomplishment: ApplicantAccomplishmentModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(applicantAccomplishment);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        console.log(response);
        this.accomplishments.map(accomplishment => accomplishment.id == applicantAccomplishment.id ? applicantAccomplishment : accomplishment);
        this.accomplishmentsObserver.next(this.accomplishments.slice());
      }
    );
  }

  addApplicantAccomplishment(applicantAccomplishment: ApplicantAccomplishmentModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantAccomplishment);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        console.log(response);
        this.accomplishments.push(applicantAccomplishment);
        this.accomplishmentsObserver.next(this.accomplishments.slice());
      }
    );
  }

  removeApplicantAccomplishment(applicantAccomplishment: ApplicantAccomplishmentModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantAccomplishment.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        console.log(response);
        let index = this.accomplishments.indexOf(applicantAccomplishment);
        this.accomplishments.splice(index, 1);
        this.accomplishmentsObserver.next(this.accomplishments.slice());
      }
    );
  }

}
