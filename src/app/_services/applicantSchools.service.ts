import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {ApplicantSchoolModel} from "../_models/applicantSchool.model";
import {ApplicantModel} from "../_models/applicant.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {JsogService} from "jsog-typescript";
import {LanguageService} from "./language.service";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ApplicantSchoolsService {

  URL = 'http://localhost:8080/applicantSchools';
  applicantSchools: ApplicantSchoolModel[];
  applicantSchoolsObserver = new Subject<ApplicantSchoolModel[]>();
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

  getApplicantSchools(applicant: ApplicantModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.URL + '/' + applicant.id, options).map(
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
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }

  updateApplicantSchool(applicantSchool: ApplicantSchoolModel) {
    const headers = this.authHeaders;
    const body = this.jsog.serialize(applicantSchool);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.applicantSchools.map(school => school.id == applicantSchool.id ? applicantSchool : school);
        this.applicantSchoolsObserver.next(this.applicantSchools.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantSchool.school + " successfully updated.");
        } else {
          this.toastr.success(applicantSchool.school + "تم التحديث بنجاح");
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

  addApplicantSchool(applicantSchool: ApplicantSchoolModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantSchool);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.applicantSchools.push(response.json());
        this.applicantSchoolsObserver.next(this.applicantSchools.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantSchool.school + " successfully added.");
        } else {
          this.toastr.success(applicantSchool.school + "تم الاضافة بنجاح");
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

  removeApplicantSchool(applicantSchool: ApplicantSchoolModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantSchool.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        const index = this.applicantSchools.indexOf(applicantSchool);
        this.applicantSchools.splice(index, 1);
        this.applicantSchoolsObserver.next(this.applicantSchools.slice());
        if (this.language == 'en') {
          this.toastr.success(applicantSchool.school + " successfully removed.");
        } else {
          this.toastr.success(applicantSchool.school + "تم الازالة بنجاح");
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
