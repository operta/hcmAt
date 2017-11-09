import { Injectable } from '@angular/core';
import {Region} from '../models/region.model';
import {Http, Response} from '@angular/http';

@Injectable()
export class RegionsService {

  regionsURL = 'http://localhost:8080/regions';

  constructor(private http: Http) { }

  getRegions() {
    return this.http.get(this.regionsURL).map(
      (response: Response) => {
        const regions: Region[] = response.json();
        return regions;
      }
    );
  }
}
