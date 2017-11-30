import { Injectable } from '@angular/core';
import {RegionModel} from '../_models/region.model';
import {Http, Response} from '@angular/http';

@Injectable()
export class RegionsService {

  regionsURL = 'http://localhost:8080/regions';

  constructor(private http: Http) { }

  getRegions() {
    return this.http.get(this.regionsURL).map(
      (response: Response) => {

        const regions: RegionModel[] = response.json();
        console.log(regions);
        return regions;
      }
    );
  }

  getCities() {
    return this.http.get(this.regionsURL + '/cities').map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }

  getCountries() {
    return this.http.get(this.regionsURL + '/countries').map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }

  getRRegions() {
    return this.http.get(this.regionsURL + '/regions').map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }
}
