
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {ContactTypeModel} from "../_models/contactType.model";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ContactTypesService {

  URL = 'http://localhost:8080/contactTypes';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getContactTypes() {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.URL, options).map(
      (response: Response) => {
        const contactTypes: ContactTypeModel[] = response.json();
        return contactTypes;
      }
    );
  }

}
