import {JobApplicationInterviewModel} from '../_models/jobApplicationInterview.model';
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

@Injectable()
export class JobApplicationInterviewService {

  interviewPath = 'http://localhost:8080/interview'

  constructor(private http: Http) {

  }
  saveInterview(interview: JobApplicationInterviewModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    console.log(interview);
    this.http.post(this.interviewPath + '/add', JSON.stringify(interview), options).map(
      (response: Response) => { console.log(response); }
    ).subscribe(response => { console.log(response); })
  }
}
