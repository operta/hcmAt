import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {ApplicantModel} from "../_models/applicant.model";
import {ApplicantExperienceModel} from "../_models/applicantExperience.model";
import {JsogService} from "jsog-typescript";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {LanguageService} from "./language.service";
import {Observable} from "rxjs/Observable";


@Injectable()
export class ApplicantExperiencesService {

  URL = 'http://localhost:8080/applicantExperiences';
  Experiences: ApplicantExperienceModel[];
  ExperiencesObserver= new Subject<ApplicantExperienceModel[]>();
  language = 'en';

  constructor(private http: Http,
              private jsog: JsogService,
              private toastr: ToastsManager,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getApplicantExperiences(applicant: ApplicantModel){
    return this.http.get(this.URL + '/' + applicant.id).map(
      (response: Response) => {
        const applicantExperiences: ApplicantExperienceModel[] = (<ApplicantExperienceModel[]>this.jsog.deserialize(response.json()));;
        return applicantExperiences;
      }
    ).subscribe(
      (data: ApplicantExperienceModel[]) => {
        this.Experiences = data;
        this.ExperiencesObserver.next(this.Experiences.slice());
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

  updateApplicantExperience(applicantExperience: ApplicantExperienceModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(applicantExperience);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        console.log(response);
        this.Experiences.map(Experience => Experience.id == applicantExperience.id ? applicantExperience : Experience);
        this.ExperiencesObserver.next(this.Experiences.slice());
        if (this.language == 'en') {
          this.toastr.success("Experience successfully updated.");
        } else {
          this.toastr.success("تم تحديث الخبرة بنجاح");
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

  addApplicantExperience(applicantExperience: ApplicantExperienceModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(applicantExperience);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        console.log(response);
        this.Experiences.push(response.json());
        this.ExperiencesObserver.next(this.Experiences.slice());
        if (this.language == 'en') {
          this.toastr.success("Experience successfully added.");
        } else {
          this.toastr.success("تم اضافة الخبرة بنجاح");
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

  removeApplicantExperience(applicantExperience: ApplicantExperienceModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + applicantExperience.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        console.log(response);
        const index = this.Experiences.indexOf(applicantExperience);
        this.Experiences.splice(index, 1);
        this.ExperiencesObserver.next(this.Experiences.slice());
        if (this.language == 'en') {
          this.toastr.success("Experience successfully removed.");
        } else {
          this.toastr.success("تم ازالة الخبرة بنجاح");
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
