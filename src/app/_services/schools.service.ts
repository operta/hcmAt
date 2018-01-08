import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {SchoolModel} from "../_models/school.model";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class SchoolsService {

  URL = 'http://localhost:8080/schools';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getSchools() {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.URL, options).map(
      (response: Response) => {
        const schools: SchoolModel[] = response.json();
        return schools;
      }
    );
  }

}
