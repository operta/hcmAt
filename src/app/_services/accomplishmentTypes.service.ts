import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AccomplishmentTypeModel} from "../_models/accomplishmentType.model";

@Injectable()
export class AccomplishmentTypesService {

  URL = 'http://77.78.198.19:8080/accomplishmentTypes';

  constructor(private http: Http) { }

  getAccomplishmentTypes() {
    return this.http.get(this.URL).map(
      (response: Response) => {
        const accomplishmentTypes: AccomplishmentTypeModel[] = response.json();
        return accomplishmentTypes;
      }
    );
  }

}
