import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {ApplicantModel} from "../_models/applicant.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {JsogService} from "jsog-typescript";
import {ApplicantContactModel} from "../_models/applicantContact.model";


@Injectable()
export class ApplicantContactsService {

  URL = 'http://localhost:8080/applicantContacts';
  applicantContacts: ApplicantContactModel[];
  applicantContactsObserver = new Subject<ApplicantContactModel[]>();

  constructor(private toastr: ToastsManager, private http: Http, private jsog: JsogService) {
  }

  getApplicantContacts(applicant: ApplicantModel){
    return this.http.get(this.URL + '/' + applicant.id).map(
      (response: Response) => {
        const applicantContacts: ApplicantContactModel[] = (<ApplicantContactModel[]>this.jsog.deserialize(response.json()));
        return applicantContacts;
      }
    ).subscribe(
      (data: ApplicantContactModel[]) => {
        this.applicantContacts = data;
        this.applicantContactsObserver.next(this.applicantContacts.slice());
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  updateApplicantContact(applicantContact: ApplicantContactModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(applicantContact);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.applicantContacts.map(item => item.id == applicantContact.id ? applicantContact : item);
        this.applicantContactsObserver.next(this.applicantContacts.slice());
        this.toastr.success(applicantContact.contact + " successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addApplicantContact(applicantContact: ApplicantContactModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantContact);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.applicantContacts.push(response.json());
        this.applicantContactsObserver.next(this.applicantContacts.slice());
        this.toastr.success(applicantContact.contact + " successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeApplicantContact(applicantContact: ApplicantContactModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantContact.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.applicantContacts.indexOf(applicantContact);
        this.applicantContacts.splice(index, 1);
        this.applicantContactsObserver.next(this.applicantContacts.slice());
        this.toastr.success(applicantContact.contact + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

}
