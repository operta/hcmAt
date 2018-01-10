import {JobApplicationTestModel} from '../_models/jobApplicationTest.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {ToastsManager} from "ng2-toastr";
import {LanguageService} from "./language.service";
import {AtJobApplicationsService} from "./at-job-applications.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class JobApplicationTestService {

  testChange= new Subject<JobApplicationTestModel[]>();
  tests: JobApplicationTestModel[] = [];
  testPath = 'http://localhost:8080/test';
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private toastr: ToastsManager,
              private languageService: LanguageService,
              private jobApplicationService: AtJobApplicationsService) {  this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

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
      (response: Response) => {
        this.tests.push(response.json());
        this.testChange.next(this.tests.slice());
        test.id = response.json().id;
        this.jobApplicationService.addTestToJobApplication(test);
        if (this.language == 'en') {
          this.toastr.success("Test successfully added.");
        } else {
          this.toastr.success("Translation needed");
        }
      }
    ).catch(
      (error: any) => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
        return Observable.throw(new Error(error.status));
      }
    )
      .subscribe();
  }

  updateTest(test: JobApplicationTestModel){
    const body = JSON.stringify(test);
    this.http.put(this.testPath + '/update', body, {headers: this.authHeaders}).map(
      (response: Response) => response.json()
    ).subscribe(response => {
      this.tests.map(item => item.id == test.id ? test : item);
      this.testChange.next(this.tests.slice());
        if (this.language == 'en') {
          this.toastr.success("Test successfully updated.");
        } else {
          this.toastr.success("Translation needed");
        }

      },
      error => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    )
  }

}
