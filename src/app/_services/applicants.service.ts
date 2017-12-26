import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import 'rxjs/Rx';
import {AuthenticationService} from "./authentication.service";
import {ApplicantModel} from "../_models/applicant.model";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {UserService} from "./user.service";
import {UserModel} from "../_models/user.model";
import {JsogService} from "jsog-typescript";
import {LanguageService} from "./language.service";

@Injectable()
export class ApplicantsService {
  private applicants: ApplicantModel[] = [];
  applicantChange= new Subject<ApplicantModel[]>();
  applicantsURL = 'http://localhost:8080/applicants';
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private toastr: ToastsManager,
              private http: Http,
              private authenticationService: AuthenticationService,
              private jsog: JsogService,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getApplicants() {
    return this.http.get(this.applicantsURL).map(
      (response: Response) => {
        const applicants: ApplicantModel[] =  (<ApplicantModel[]>this.jsog.deserialize(response.json()));
        return applicants;
      }
    ).subscribe(
      (data: ApplicantModel[]) => {
        this.applicants = data;
        this.applicantChange.next(this.applicants.slice());
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

  getApplicant(id: string) {
    return this.http.get(this.applicantsURL + '/' + id).map(
      (response: Response) => {
        if (response.arrayBuffer().byteLength == 0) {
          return null;
        } else {
          const applicant: ApplicantModel = response.json();
          return applicant;
        }
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
        this.applicants.push(response.json());
        this.applicantChange.next(this.applicants.slice());
        if (this.language == 'en') {
          this.toastr.success("Applicant profile successfully created.");
        } else {
          this.toastr.success("تم انشاء الملف الشخصي الخاص بمقدم الطلب بنجاح");
        }
        return response.json();
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
          if (this.language == 'en') {
            this.toastr.success("Applicant profile successfully updated.");
          } else {
            this.toastr.success("تم تحديث الملف الشخصي الخاص بمقدم الطلب بنجاح");
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
