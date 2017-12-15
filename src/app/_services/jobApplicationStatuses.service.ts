import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {JobApplicationStatusModel} from "../_models/jobApplicationStatus.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";

@Injectable()
export class JobApplicationStatusesService {
  URL = 'http://77.78.198.19:8080/jobApplicationStatuses';
  jobApplicationStatus: JobApplicationStatusModel[];
  jobApplicationStatusObserver = new Subject<JobApplicationStatusModel[]>();

  constructor(private toastr: ToastsManager, private http: Http) {
  }

  getJobApplicationStatuses(){
    return this.http.get(this.URL).map(
      (response: Response) => {
        const jobApplicationStatus: JobApplicationStatusModel[] = response.json();
        return jobApplicationStatus;
      }
    ).subscribe(
      (data: JobApplicationStatusModel[]) => {
        this.jobApplicationStatus = data;
        this.jobApplicationStatusObserver.next(this.jobApplicationStatus.slice());
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  updateJobApplicationStatus(jobApplicationStatus: JobApplicationStatusModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(jobApplicationStatus);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.jobApplicationStatus.map(jobApplicationStatus => jobApplicationStatus.id == jobApplicationStatus.id ? jobApplicationStatus : jobApplicationStatus);
        this.jobApplicationStatusObserver.next(this.jobApplicationStatus.slice());
        this.toastr.success("Status successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addJobApplicationStatus(jobApplicationStatus: JobApplicationStatusModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(jobApplicationStatus);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.jobApplicationStatus.push(response.json());
        this.jobApplicationStatusObserver.next(this.jobApplicationStatus.slice());
        this.toastr.success("Status successfully added.");
      }
    ).subscribe( response => console.log(response));
  }

  removeJobApplicationStatus(jobApplicationStatus: JobApplicationStatusModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/' + jobApplicationStatus.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.jobApplicationStatus.indexOf(jobApplicationStatus);
        this.jobApplicationStatus.splice(index, 1);
        this.jobApplicationStatusObserver.next(this.jobApplicationStatus.slice());
        this.toastr.success("Status successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }
}
