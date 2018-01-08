import {JobApplicationTestModel} from '../_models/jobApplicationTest.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class JobApplicationTestService {

  testChange= new Subject<JobApplicationTestModel[]>();
  tests: JobApplicationTestModel[];
  testPath = 'http://localhost:8080/test';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {}

  initTests(tests: JobApplicationTestModel[]) {
    this.tests = tests;
    this.testChange.next(this.tests.slice());
  }

  getTests() {
    return this.tests.slice();
  }

  saveTest(test: JobApplicationTestModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.post(this.testPath + '/add', test, options).map(
      (response: Response) => response.json()
    ).subscribe(response => {
      this.tests.push(response);
      this.testChange.next(this.tests.slice());
    })
  }
}
