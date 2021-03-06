import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {ApplicantModel} from "../_models/applicant.model";
import {ApplicantAccomplishmentModel} from "../_models/applicantAccomplishment.model";
import {JsogService} from "jsog-typescript";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {LanguageService} from "./language.service";
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class ApplicantAccomplishmentsService {

  URL = 'http://localhost:8080/applicantAccomplishments';
  accomplishments: ApplicantAccomplishmentModel[] = [];
  accomplishmentsObserver= new Subject<ApplicantAccomplishmentModel[]>();
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private toastr: ToastsManager,
              private jsog: JsogService,
              private languageService: LanguageService,
              private authenticationService: AuthenticationService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getApplicantAccomplishments(applicant: ApplicantModel){
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.URL + '/' + applicant.id, options).map(
      (response: Response) => {
        const applicantAccomplishments: ApplicantAccomplishmentModel[] = (
          <ApplicantAccomplishmentModel[]>this.jsog.deserialize(response.json())
        );
        return applicantAccomplishments;
      }
    ).subscribe(
      (data: ApplicantAccomplishmentModel[]) => {
        this.accomplishments = data;
        this.accomplishmentsObserver.next(this.accomplishments.slice());
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

  updateApplicantAccomplishment(applicantAccomplishment: ApplicantAccomplishmentModel) {
    const headers = this.authHeaders;
    const body = JSON.stringify(applicantAccomplishment);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.accomplishments.map(
          accomplishment => accomplishment.id == applicantAccomplishment.id ? applicantAccomplishment : accomplishment
        );
        this.accomplishmentsObserver.next(this.accomplishments.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantAccomplishment.id_accomplishment_type.name + " successfully updated.");
        } else {
          this.toastr.success(" تم التحديث بنجاح" + applicantAccomplishment.id_accomplishment_type.name);
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

  addApplicantAccomplishment(applicantAccomplishment: ApplicantAccomplishmentModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantAccomplishment);
    this.http.post(this.URL + '/add', body, options).map(
      res => {
        this.accomplishments.push(res.json());
        this.accomplishmentsObserver.next(this.accomplishments.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantAccomplishment.id_accomplishment_type.name + " successfully added.");
        } else {
          this.toastr.success(" تم الاضافة بنجاح" + applicantAccomplishment.id_accomplishment_type.name);
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

  removeApplicantAccomplishment(applicantAccomplishment: ApplicantAccomplishmentModel){
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantAccomplishment.id, options).map(
      (response: Response) => {
      }
    ).subscribe(
      response => {
        const index = this.accomplishments.indexOf(applicantAccomplishment);
        this.accomplishments.splice(index, 1);
        this.accomplishmentsObserver.next(this.accomplishments.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantAccomplishment.id_accomplishment_type.name + " successfully removed.");
        } else {
          this.toastr.success("تم الازالة بنجاح" + applicantAccomplishment.id_accomplishment_type.name);
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
