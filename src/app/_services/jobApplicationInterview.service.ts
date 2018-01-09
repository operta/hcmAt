import {JobApplicationInterviewModel} from '../_models/jobApplicationInterview.model';
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {AuthenticationService} from "./authentication.service";
import {ToastsManager} from "ng2-toastr";
import {LanguageService} from "./language.service";
import {Observable} from "rxjs/Observable";
import {AtJobApplicationsService} from "./at-job-applications.service";

@Injectable()
export class JobApplicationInterviewService {

  interviewChange= new Subject<JobApplicationInterviewModel[]>();
  interviews: JobApplicationInterviewModel[] = [];
  interviewPath = 'http://localhost:8080/interview';
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private toastr: ToastsManager,
              private languageService: LanguageService,
              private jobApplicationService: AtJobApplicationsService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
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
      (response: Response) => {

        this.interviews.push(response.json());
        this.interviewChange.next(this.interviews.slice());
        console.log(interview);
        console.log(response.json());
        interview.id = response.json().id;
        console.log(interview);
        this.jobApplicationService.addInterviewToJobApplication(interview);
        if (this.language == 'en') {
          this.toastr.success("Interview successfully added.");
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



  updateInterview(interview: JobApplicationInterviewModel) {
    const body = JSON.stringify(interview);
    this.http.put(this.interviewPath + '/update', body, {headers: this.authHeaders}).map(
      (response: Response) => response.json()
    ).subscribe(response => {
      this.interviews.map(item => item.id == interview.id ? interview : item);
      this.interviewChange.next(this.interviews.slice());
        if (this.language == 'en') {
          this.toastr.success("Interview successfully updated.");
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
    );
  }
}
