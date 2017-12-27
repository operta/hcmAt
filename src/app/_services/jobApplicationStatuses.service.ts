import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {JobApplicationStatusModel} from "../_models/jobApplicationStatus.model";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {LanguageService} from "./language.service";

@Injectable()
export class JobApplicationStatusesService {
  URL = 'http://77.78.198.19:8080/jobApplicationStatuses';
  jobApplicationStatus: JobApplicationStatusModel[];
  jobApplicationStatusObserver = new Subject<JobApplicationStatusModel[]>();
  language = 'en'

  constructor(private toastr: ToastsManager,
              private http: Http,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
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
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
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
        if (this.language == 'en') {
          this.toastr.success("Status successfully updated.");
        } else {
          this.toastr.success("تم تحديث الحالة بنجاح");
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

  addJobApplicationStatus(jobApplicationStatus: JobApplicationStatusModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(jobApplicationStatus);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.jobApplicationStatus.push(response.json());
        this.jobApplicationStatusObserver.next(this.jobApplicationStatus.slice());
        if (this.language == 'en') {
          this.toastr.success("Status successfully added.");
        } else {
          this.toastr.success("تم اضافة الحالة بنجاح");
        }
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
        const index = this.jobApplicationStatus.indexOf(jobApplicationStatus);
        this.jobApplicationStatus.splice(index, 1);
        this.jobApplicationStatusObserver.next(this.jobApplicationStatus.slice());
        if (this.language == 'en') {
          this.toastr.success("Status successfully removed.");
        } else {
          this.toastr.success("تم ازالة الحالة بنجاح");
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
