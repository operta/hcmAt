import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {WorkPlaceModel} from '../_models/workPlace.model';

@Injectable()
export class WorkPlacesService {
  workPlacesURL = 'http://77.78.198.19:8080/workPlaces';

  constructor(private http: Http) { }

  getWorkPlaces() {
    return this.http.get(this.workPlacesURL).map(
      (response: Response) => {
        const workPlaces: WorkPlaceModel[] = response.json();
        console.log(workPlaces);
        return response.json();
      }
    );
  }

}
