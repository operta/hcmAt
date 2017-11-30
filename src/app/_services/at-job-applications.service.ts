import { Injectable } from '@angular/core';
import {JobApplicationModel} from '../_models/jobApplication.model';
import {VacancyModel} from '../_models/vacancy.model';

@Injectable()
export class AtJobApplicationsService {

  jobApplications: JobApplicationModel[];

  constructor() { }

  initJobApplications(vacancy: VacancyModel) {
    this.jobApplications = vacancy.jobApplications;
  }

  getJobApplications() {
    return this.jobApplications.slice();
  }

  getJobApplicationById(id: number) {
    return this.jobApplications.find(jobApplication => jobApplication.id === id);
  }
}
