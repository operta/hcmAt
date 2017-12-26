import {Injectable} from "@angular/core";
import {JobApplicationNotificationModel} from "../_models/jobApplicationNotification.model";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {JsogService} from "jsog-typescript";
import {LanguageService} from "./language.service";

@Injectable()
export class JobApplicationNotificationsService {
  URL = 'http://localhost:8080/jobApplicationNotifications';
  jobApplicationNotifications: JobApplicationNotificationModel[] = [];
  jobApplicationNotificationsObserver = new Subject<JobApplicationNotificationModel[]>();
  language = 'en';

  constructor(private toastr: ToastsManager,
              private http: Http,
              private jsogService: JsogService,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  getJobApplicationNotifications() {
    return this.http.get(this.URL).map(
      (response: Response) => {
        const jobApplicationNotifications: JobApplicationNotificationModel[] = (<JobApplicationNotificationModel[]>this.jsogService.deserialize(response.json()));
        return jobApplicationNotifications;
      }
    ).subscribe(
      (data: JobApplicationNotificationModel[]) => {
        this.jobApplicationNotifications = data;
        this.jobApplicationNotificationsObserver.next(this.jobApplicationNotifications.slice());
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

  updateJobApplicationNotification(jobApplicationNotification: JobApplicationNotificationModel) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = this.jsogService.serialize(jobApplicationNotification)
     // const body = JSON.stringify(jobApplicationNotification);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.jobApplicationNotifications.map(jobApplicationNotification => jobApplicationNotification.id == jobApplicationNotification.id ? jobApplicationNotification : jobApplicationNotification);
        this.jobApplicationNotificationsObserver.next(this.jobApplicationNotifications.slice());
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

  addJobApplicationNotification(jobApplicationNotification: JobApplicationNotificationModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(jobApplicationNotification);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        // this.jobApplicationNotifications.push(response.json());
        // this.jobApplicationNotificationsObserver.next(this.jobApplicationNotifications.slice());
        this.getJobApplicationNotifications();
        if (this.language == 'en') {
          this.toastr.success("Notification sent.");
        } else {
          this.toastr.success("تم ارسال الاشعارات.");
        }

      }
    ).subscribe(
      response => console.log(response)
    );
  }

  removeJobApplicationNotification(jobApplicationNotification: JobApplicationNotificationModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/' + jobApplicationNotification.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        const index = this.jobApplicationNotifications.indexOf(jobApplicationNotification);
        this.jobApplicationNotifications.splice(index, 1);
        this.jobApplicationNotificationsObserver.next(this.jobApplicationNotifications.slice());
        if (this.language == 'en') {
          this.toastr.success( "Notification successfully removed.");
        } else {
          this.toastr.success("Notification successfully removed.");
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
