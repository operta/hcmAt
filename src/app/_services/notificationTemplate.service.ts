import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {NotificationTemplateModel} from "../_models/notificationTemplate.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NotificationTemplatesService{
  URL = 'http://localhost:8080/notificationTemplates';
  notificationTemplates: NotificationTemplateModel[];
  notificationTemplatesObserver = new Subject<NotificationTemplateModel[]>();

  constructor(private toastr: ToastsManager, private http: Http) {
  }

  getNotificationTemplates(){
    return this.http.get(this.URL).map(
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
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  updateNotificationTemplate(notificationTemplate: NotificationTemplateModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(notificationTemplate);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.notificationTemplates.map(notificationTemplate => notificationTemplate.id == notificationTemplate.id ? notificationTemplate : notificationTemplate);
        this.notificationTemplatesObserver.next(this.notificationTemplates.slice());
        this.toastr.success(notificationTemplate.code + "template successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addNotificationTemplate(notificationTemplate: NotificationTemplateModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(notificationTemplate);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.notificationTemplates.push(response.json());
        this.notificationTemplatesObserver.next(this.notificationTemplates.slice());
        this.toastr.success(notificationTemplate.code + "template successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeNotificationTemplate(notificationTemplate: NotificationTemplateModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/' + notificationTemplate.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.notificationTemplates.indexOf(notificationTemplate);
        this.notificationTemplates.splice(index, 1);
        this.notificationTemplatesObserver.next(this.notificationTemplates.slice());
        this.toastr.success(notificationTemplate.code + "template successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }
}