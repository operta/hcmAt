import { Injectable } from '@angular/core';
import {JobApplicationModel} from '../_models/jobApplication.model';
import {VacancyModel} from '../_models/vacancy.model';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {ToastsManager} from 'ng2-toastr';
import {Observable} from 'rxjs/Observable';
import {JsogService} from 'jsog-typescript';

@Injectable()
export class AtJobApplicationsService {

  jobApplicationsURL = 'http://localhost:8080/jobApplications'
  jobApplications: JobApplicationModel[] = new Array<JobApplicationModel>();
  jobApplicationsChange = new Subject<JobApplicationModel[]>();

  constructor(private jsogService: JsogService, private http: Http, private toastr: ToastsManager) { }

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

        this.jobApplications.push(response.json());

        this.jobApplicationsChange.next(this.jobApplications.slice());
        this.toastr.success('Successfull application');
      }
    ).subscribe(
      response => console.log(response),
      error => {
        this.toastr.error('An error occured.');
      }
    );
  }

  updateJobApplication(jobApplication: JobApplicationModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(jobApplication);
    return this.http.put(this.jobApplicationsURL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
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
