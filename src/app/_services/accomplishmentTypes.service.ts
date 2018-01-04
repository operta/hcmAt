import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {AccomplishmentTypeModel} from "../_models/accomplishmentType.model";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AccomplishmentTypesService {

  URL = 'http://localhost:8080/accomplishmentTypes';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getAccomplishmentTypes() {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.URL, options).map(
      (response: Response) => {
        const accomplishmentTypes: AccomplishmentTypeModel[] = response.json();
        return accomplishmentTypes;
      }
    );
  }

}
