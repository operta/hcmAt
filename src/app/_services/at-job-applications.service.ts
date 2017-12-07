import { Injectable } from '@angular/core';
import {JobApplicationModel} from '../_models/jobApplication.model';
import {VacancyModel} from '../_models/vacancy.model';
import {Http, Response} from '@angular/http';

@Injectable()
export class AtJobApplicationsService {

  jobApplications: JobApplicationModel[];
  jobApplicationsURL = 'http://localhost:8080/jobApplications';

  constructor(private http: Http) { }


  getJobApplications() {
    return this.jobApplications.slice();
  }

  getJobApplicationsByVacancy(id: number) {
    return this.http.get(this.jobApplicationsURL + '/byVacancy/' + id).map(
      (response: Response) => {
        const jobApplications: JobApplicationModel[] = response.json();
        return jobApplications;
      }
    );
  }

  getJobApplicationById(id: number) {
    return this.jobApplications.find(x => x.id === id);
  }
}
