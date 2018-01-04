import {JobApplicationInterviewModel} from '../_models/jobApplicationInterview.model';
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class JobApplicationInterviewService {

  interviewChange= new Subject<JobApplicationInterviewModel[]>();
  interviews: JobApplicationInterviewModel[];
  interviewPath = 'http://localhost:8080/interview';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  initInterviews(interviews: JobApplicationInterviewModel[]) {
    this.interviews = interviews;
    this.interviewChange.next(this.interviews.slice());
  }

  getInterviews() {
    return this.interviews.slice();
  }

  saveInterview(interview: JobApplicationInterviewModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.post(this.interviewPath + '/add', interview, options).map(
      (response: Response) => response.json()
    ).subscribe(response => {
      console.log(response);
      this.interviews.push(response);
      this.interviewChange.next(this.interviews.slice());
    })
  }
}
