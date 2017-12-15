import {JobApplicationInterviewModel} from '../_models/jobApplicationInterview.model';
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Subject} from "rxjs/Subject";

@Injectable()
export class JobApplicationInterviewService {

  interviewChange= new Subject<JobApplicationInterviewModel[]>();
  interviews: JobApplicationInterviewModel[];
  interviewPath = 'http://77.78.198.19:8080/interview'

  constructor(private http: Http) {

  }

  initInterviews(interviews: JobApplicationInterviewModel[]) {
    this.interviews = interviews;
    this.interviewChange.next(this.interviews.slice());
  }

  getInterviews() {
    return this.interviews.slice();
  }

  saveInterview(interview: JobApplicationInterviewModel) {
    const headers = new Headers({'Content-type': 'application/json'});
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
