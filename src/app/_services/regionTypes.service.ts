import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RegionTypeModel} from "../_models/regionType.model";

@Injectable()
export class RegionTypesService {

  URL = 'http://localhost:8080/regionTypes';

  constructor(private http: Http) { }

  getRegionTypes() {
    return this.http.get(this.URL).map(
      (response: any) => {
        const regionTypes: RegionTypeModel[] = response.json();
        return regionTypes;
      }
    );
  }
}
