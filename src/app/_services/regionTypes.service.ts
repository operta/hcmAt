import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {RegionTypeModel} from "../_models/regionType.model";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class RegionTypesService {

  URL = 'http://localhost:8080/regionTypes';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getRegionTypes() {
    const headers = this.authHeaders;
    return this.http.get(this.URL, {headers: headers}).map(
      (response: any) => {
        const regionTypes: RegionTypeModel[] = response.json();
        return regionTypes;
      }
    );
  }
}
