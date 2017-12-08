import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {ApplicantModel} from "../_models/applicant.model";
import {ApplicantAccomplishmentModel} from "../_models/applicantAccomplishment.model";
import {JsogService} from "jsog-typescript";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";


@Injectable()
export class ApplicantAccomplishmentsService {

  URL = 'http://localhost:8080/applicantAccomplishments';
  accomplishments: ApplicantAccomplishmentModel[];
  accomplishmentsObserver= new Subject<ApplicantAccomplishmentModel[]>();

  constructor(private http: Http, private toastr: ToastsManager, private jsog: JsogService) {}

  getApplicantAccomplishments(applicant: ApplicantModel){
    return this.http.get(this.URL + '/' + applicant.id).map(
      (response: Response) => {
        const applicantAccomplishments: ApplicantAccomplishmentModel[] = (<ApplicantAccomplishmentModel[]>this.jsog.deserialize(response.json()));
        return applicantAccomplishments;
      }
    ).subscribe(
      (data: ApplicantAccomplishmentModel[]) => {
        this.accomplishments = data;
        this.accomplishmentsObserver.next(this.accomplishments.slice());
      },
      error => {
        this.toastr.error( error.status, "An error occured");
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
        this.accomplishments.map(accomplishment => accomplishment.id == applicantAccomplishment.id ? applicantAccomplishment : accomplishment);
        this.accomplishmentsObserver.next(this.accomplishments.slice());
        this.toastr.success(applicantAccomplishment.id_accomplishment_type.name + " successfully updated.");

      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addApplicantAccomplishment(applicantAccomplishment: ApplicantAccomplishmentModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantAccomplishment);
    this.http.post(this.URL + '/add', body, options).map(
      res => {
        this.accomplishments.push(res.json());
        this.accomplishmentsObserver.next(this.accomplishments.slice());
        this.toastr.success(applicantAccomplishment.id_accomplishment_type.name + " successfully added.");
      }
    ).catch(
    (error: any) => {
      this.toastr.error( error.status, "An error occured");
      return Observable.throw(new Error(error.status));
      }
    ).subscribe();
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
        let index = this.accomplishments.indexOf(applicantAccomplishment);
        this.accomplishments.splice(index, 1);
        this.accomplishmentsObserver.next(this.accomplishments.slice());
        this.toastr.success(applicantAccomplishment.id_accomplishment_type.name + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

}
