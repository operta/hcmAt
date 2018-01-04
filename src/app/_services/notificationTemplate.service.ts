import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {NotificationTemplateModel} from "../_models/notificationTemplate.model";
import {Observable} from "rxjs/Observable";
import {LanguageService} from "./language.service";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class NotificationTemplatesService{
  URL = 'http://localhost:8080/notificationTemplates';
  notificationTemplates: NotificationTemplateModel[];
  notificationTemplatesObserver = new Subject<NotificationTemplateModel[]>();
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

  getNotificationTemplates() {
    return this.http.get(this.URL, {headers: this.authHeaders}).map(
      (response: Response) => {
        const notificationTemplates: NotificationTemplateModel[] = response.json();
        return notificationTemplates;
      }
    ).subscribe(
      (data: NotificationTemplateModel[]) => {
        this.notificationTemplates = data;
        this.notificationTemplatesObserver.next(this.notificationTemplates.slice());
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

  updateNotificationTemplate(notificationTemplate: NotificationTemplateModel) {
    const headers = this.authHeaders;
    const body = JSON.stringify(notificationTemplate);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.notificationTemplates.map(notificationTemplate => notificationTemplate.id == notificationTemplate.id ? notificationTemplate : notificationTemplate);
        this.notificationTemplatesObserver.next(this.notificationTemplates.slice());
        if (this.language == 'en') {
          this.toastr.success(notificationTemplate.code + "template successfully updated.");
        } else {
          this.toastr.success(notificationTemplate.code + "تم تحديث القالب بنجاح");
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

  addNotificationTemplate(notificationTemplate: NotificationTemplateModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(notificationTemplate);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.notificationTemplates.push(response.json());
        this.notificationTemplatesObserver.next(this.notificationTemplates.slice());
        if (this.language == 'en') {
          this.toastr.success(notificationTemplate.code + "template successfully added.");
        } else {
          this.toastr.success(notificationTemplate.code + "تم اضافة القالب بنجاح");
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

  removeNotificationTemplate(notificationTemplate: NotificationTemplateModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/' + notificationTemplate.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        const index = this.notificationTemplates.indexOf(notificationTemplate);
        this.notificationTemplates.splice(index, 1);
        this.notificationTemplatesObserver.next(this.notificationTemplates.slice());
        if (this.language == 'en') {
          this.toastr.success(notificationTemplate.code + "template successfully removed.");
        } else {
          this.toastr.success(notificationTemplate.code + "تم ازالة القالب بنجاح");
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
