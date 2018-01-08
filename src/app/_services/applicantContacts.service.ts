import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

import {ApplicantModel} from "../_models/applicant.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {JsogService} from "jsog-typescript";
import {ApplicantContactModel} from "../_models/applicantContact.model";
import {LanguageService} from "./language.service";
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class ApplicantContactsService {

  URL = 'http://localhost:8080/applicantContacts';
  applicantContacts: ApplicantContactModel[];
  applicantContactsObserver = new Subject<ApplicantContactModel[]>();
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private toastr: ToastsManager,
              private http: Http,
              private jsog: JsogService,
              private languageService: LanguageService,
              private authenticationService: AuthenticationService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getApplicantContacts(applicant: ApplicantModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.URL + '/' + applicant.id, options).map(
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
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }

  updateApplicantContact(applicantContact: ApplicantContactModel) {
    const headers = this.authHeaders;
    const body = this.jsog.serialize(applicantContact);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.applicantContacts.map(item => item.id == applicantContact.id ? applicantContact : item);
        this.applicantContactsObserver.next(this.applicantContacts.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantContact.contact + " successfully updated.");
        } else {
          this.toastr.success(applicantContact.contact + " تم التحديث بنجاح");
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

  addApplicantContact(applicantContact: ApplicantContactModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantContact);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.applicantContacts.push(response.json());
        this.applicantContactsObserver.next(this.applicantContacts.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantContact.contact + " successfully added.");
        } else {
          this.toastr.success(applicantContact.contact + " تم الاضافة بنجاح");
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

  removeApplicantContact(applicantContact: ApplicantContactModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantContact.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        const index = this.applicantContacts.indexOf(applicantContact);
        this.applicantContacts.splice(index, 1);
        this.applicantContactsObserver.next(this.applicantContacts.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantContact.contact + " successfully removed.");
        } else {
          this.toastr.success(applicantContact.contact + " تم الازالة بنجاح");
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
