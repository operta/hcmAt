import { Injectable } from '@angular/core';
import {JobApplicationModel} from '../_models/jobApplication.model';
import {VacancyModel} from '../_models/vacancy.model';
import {Http, Response} from "@angular/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AtJobApplicationsService {

  jobApplicationsURL = 'http://localhost:8080/jobApplications'
  jobApplications: JobApplicationModel[];
  jobApplicationsChange = new Subject<JobApplicationModel[]>();

  constructor(private http: Http) { }

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
        const jobApplications: JobApplicationModel[] = response.json();
        return jobApplications;
      }
    ).subscribe(data => {
      this.jobApplications = data;
      this.jobApplicationsChange.next(this.jobApplications.slice());
    });
  }
}
