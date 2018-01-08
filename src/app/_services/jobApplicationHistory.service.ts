import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {JobApplicationHistoryModel} from "../_models/jobApplicationHistory.model";
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class JobApplicationHistoryService {

  URL = 'http://localhost:8080/jobApplicationHistory';


  constructor(private toastr: ToastsManager, private http: Http) {
  }


  getJobApplicationHistoryByJobApplicationId(jobApplicationId: string) {
    return this.http.get(this.URL + '/' + jobApplicationId).map(
      (response: Response) => {
        const history: JobApplicationHistoryModel[] = response.json();
        console.log(history);
        return history;
      }
    );
  }

  addJobApplicationHistory(history: JobApplicationHistoryModel) {
    const headers = new Headers({'Content-type': 'application/json'});
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
