import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {WorkPlaceModel} from '../_models/workPlace.model';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class WorkPlacesService {
  workPlacesURL = 'http://localhost:8080/workPlaces';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getWorkPlaces() {
    const headers = this.authHeaders;
    return this.http.get(this.workPlacesURL, {headers: headers}).map(
      (response: Response) => {
        const workPlaces: WorkPlaceModel[] = response.json();
        return response.json();
      }
    );
  }

}
