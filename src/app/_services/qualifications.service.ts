import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {QualificationModel} from "../_models/qualification";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {LanguageService} from "./language.service";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class QualificationsService{
  URL = 'http://localhost:8080/qualifications';
  qualifications: QualificationModel[];
  qualificationsObserver = new Subject<QualificationModel[]>();
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private toastr: ToastsManager,
              private http: Http,
              private languageService: LanguageService,
              private authenticationService: AuthenticationService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getQualifications() {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.URL, options).map(
      (response: Response) => {
        const qualifications: QualificationModel[] = response.json();
        return qualifications;
      }
    ).subscribe(
      (data: QualificationModel[]) => {
        this.qualifications = data;
        this.qualificationsObserver.next(this.qualifications.slice());
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

  updateQualification(qualification: QualificationModel) {
    const headers = this.authHeaders;
    const body = JSON.stringify(qualification);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.qualifications.map(qualification => qualification.id == qualification.id ? qualification : qualification);
        this.qualificationsObserver.next(this.qualifications.slice());
        if (this.language == 'en') {
          this.toastr.success(qualification.name + " successfully updated.");
        } else {
          this.toastr.success(qualification.name + "تم التحديث بنجاح");
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

  addQualification(qualification: QualificationModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(qualification);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.qualifications.push(response.json());
        this.qualificationsObserver.next(this.qualifications.slice());
        if (this.language == 'en') {
          this.toastr.success(qualification.name + " successfully added.");
        } else {
          this.toastr.success(qualification.name + "تم الاضافة بنجاح");
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

  removeQualification(qualification: QualificationModel){
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + qualification.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        const index = this.qualifications.indexOf(qualification);
        this.qualifications.splice(index, 1);
        this.qualificationsObserver.next(this.qualifications.slice());
        if (this.language == 'en') {
          this.toastr.success(qualification.name + " successfully removed.");
        } else {
          this.toastr.success(qualification.name + "تم الازالة بنجاح");
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
