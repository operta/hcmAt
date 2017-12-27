import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {SchoolModel} from "../_models/school.model";

@Injectable()
export class SchoolsService {

  URL = 'http://77.78.198.19:8080/schools';

  constructor(private http: Http) { }

  getSchools() {
    return this.http.get(this.URL).map(
      (response: Response) => {
        const schools: SchoolModel[] = response.json();
        return schools;
      }
    );
  }

}
