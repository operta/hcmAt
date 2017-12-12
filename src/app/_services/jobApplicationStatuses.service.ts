import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {JobApplicationStatusModel} from "../_models/jobApplicationStatus.model";

@Injectable()
export class JobApplicationStatusesService {

  URL = 'http://localhost:8080/jobApplicationStatuses';

  constructor(private http: Http) { }

  getJobApplicationStatuses() {
    return this.http.get(this.URL).map(
      (response: Response) => {
        const jobApplicationStatuses: JobApplicationStatusModel[] = response.json();
        return jobApplicationStatuses;
      }
    );
  }

}
