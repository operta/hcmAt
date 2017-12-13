import { Injectable } from '@angular/core';
import {JobApplicationModel} from '../_models/jobApplication.model';
import {VacancyModel} from '../_models/vacancy.model';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {ToastsManager} from 'ng2-toastr';
import {Observable} from 'rxjs/Observable';
import {JsogService} from 'jsog-typescript';
import {JobApplicationHistoryService} from "./jobApplicationHistory.service";
import {JobApplicationHistoryModel} from "../_models/jobApplicationHistory.model";
import {JobApplicationStatusModel} from "../_models/jobApplicationStatus.model";
import {JobApplicationNotificationsService} from "./jobApplicationNotification.service";
import {JobApplicationNotificationModel} from "../_models/jobApplicationNotification.model";
import {NotificationTemplateModel} from "../_models/notificationTemplate.model";

@Injectable()
export class AtJobApplicationsService {

  jobApplicationsURL = 'http://localhost:8080/jobApplications'
  jobApplications: JobApplicationModel[] = new Array<JobApplicationModel>();
  jobApplicationsChange = new Subject<JobApplicationModel[]>();

  constructor(private jsogService: JsogService, private http: Http, private toastr: ToastsManager, private jobApplicationHistoryService: JobApplicationHistoryService, private jobApplicationNotificationService: JobApplicationNotificationsService) { }

  initJobApplications(vacancy: VacancyModel) {
    this.jobApplications = vacancy.jobApplications;
  }

  getJobApplications() {
    return this.jobApplications.slice();
  }

  getJobApplicationById(id: number) {
    return this.jobApplications.find(jobApplication => +jobApplication.id === id);
  }

  getJobApplicationsByApplicantId(id: number) {
    return this.http.get(this.jobApplicationsURL + '/byApplicant/' + id).map(
      (response: Response) => {
        const jobApplications: JobApplicationModel[] = (<JobApplicationModel[]>this.jsogService.deserialize(response.json()));
        return jobApplications;
      }
    ).subscribe(data => {
      this.jobApplications = data;
      this.jobApplicationsChange.next(this.jobApplications.slice());
    });
  }

  addJobApplication(jobApplication: JobApplicationModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(jobApplication);
    this.http.post(this.jobApplicationsURL + '/add', body, options).map(
      (response: Response) => {

        const history = new JobApplicationHistoryModel(
          null,
          response.json(),
          null,
          jobApplication.id_status,
          null,
          new Date,
          null,
          new Date
        );
        this.jobApplicationHistoryService.addJobApplicationHistory(history);
        this.jobApplications.push(response.json());
        this.jobApplicationsChange.next(this.jobApplications.slice());
        this.toastr.success('Successfull application');
      }
    ).subscribe(
      response => {
        console.log(response);
      },
      error => {
        this.toastr.error('An error occured.');
      }
    );
  }

  updateJobApplication(jobApplication: JobApplicationModel, currentStatus: JobApplicationStatusModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(jobApplication);
    return this.http.put(this.jobApplicationsURL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        const history = new JobApplicationHistoryModel(
          null,
          jobApplication,
          currentStatus,
          jobApplication.id_status,
          null,
          new Date,
          null,
          new Date
        );
        this.jobApplicationHistoryService.addJobApplicationHistory(history);
        const notificationTemplate = new NotificationTemplateModel(
          418,null,null, null, null, null, null, null
        );
        const notification = new JobApplicationNotificationModel(
          null,
          jobApplication,
          notificationTemplate,
          new Date,
          'Y',
          null,
          new Date,
          null,
          new Date
        );
        console.log(notification);
        this.jobApplicationNotificationService.addJobApplicationNotification(notification);
        this.jobApplications.map(item => item.id == jobApplication.id ? jobApplication : item);
        this.jobApplicationsChange.next(this.jobApplications.slice());
        this.toastr.success('Job application successfully updated.');
      },
      error => {
        this.toastr.error( error.status, 'An error occured');
      }
    );
  }
}
