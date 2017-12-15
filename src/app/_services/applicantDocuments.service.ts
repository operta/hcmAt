import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {ApplicantModel} from "../_models/applicant.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {JsogService} from "jsog-typescript";
import {ApplicantDocumentModel} from "../_models/applicantDocument.model";

@Injectable()
export class ApplicantDocumentsService {

  URL = 'http://77.78.198.19:8080/applicantDocuments';
  applicantDocuments: ApplicantDocumentModel[];
  applicantDocumentsObserver = new Subject<ApplicantDocumentModel[]>();

  constructor(private toastr: ToastsManager, private http: Http, private jsog: JsogService) {
  }

  getApplicantDocuments(applicant: ApplicantModel){
    return this.http.get(this.URL + '/' + applicant.id).map(
      (response: Response) => {
        const applicantDocuments: ApplicantDocumentModel[] = (<ApplicantDocumentModel[]>this.jsog.deserialize(response.json()));
        return applicantDocuments;
      }
    ).subscribe(
      (data: ApplicantDocumentModel[]) => {
        this.applicantDocuments = data;
        this.applicantDocumentsObserver.next(this.applicantDocuments.slice());
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  updateApplicantDocument(applicantDocument: ApplicantDocumentModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(applicantDocument);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.applicantDocuments.map(item => item.id == applicantDocument.id ? applicantDocument : item);
        this.applicantDocumentsObserver.next(this.applicantDocuments.slice());
        this.toastr.success(applicantDocument.name + " successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addApplicantDocument(applicantDocument: ApplicantDocumentModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantDocument);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.applicantDocuments.push(response.json());
        this.applicantDocumentsObserver.next(this.applicantDocuments.slice());
        this.toastr.success(applicantDocument.name + " successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeApplicantDocument(applicantDocument: ApplicantDocumentModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantDocument.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.applicantDocuments.indexOf(applicantDocument);
        this.applicantDocuments.splice(index, 1);
        this.applicantDocumentsObserver.next(this.applicantDocuments.slice());
        this.toastr.success(applicantDocument.name + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

}
