import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {JobApplicationHistoryModel} from "../_models/jobApplicationHistory.model";
import {ToastsManager} from "ng2-toastr";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class JobApplicationHistoryService {

  URL = 'http://localhost:8080/jobApplicationHistory';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private toastr: ToastsManager, private http: Http, private authenticationService: AuthenticationService) {
  }


  getJobApplicationHistoryByJobApplicationId(jobApplicationId: string) {
    return this.http.get(this.URL + '/' + jobApplicationId, {headers: this.authHeaders}).map(
      (response: Response) => {
        const history: JobApplicationHistoryModel[] = response.json();
        return history;
      }
    );
  }

  addJobApplicationHistory(history: JobApplicationHistoryModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(history);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        console.log(response.json());
      }
    ).subscribe(
      response => console.log(response)
    );
  }

}
