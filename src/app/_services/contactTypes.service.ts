
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {ContactTypeModel} from "../_models/contactType.model";

@Injectable()
export class ContactTypesService {

  URL = 'http://localhost:8080/contactTypes';

  constructor(private http: Http) { }

  getContactTypes() {
    return this.http.get(this.URL).map(
      (response: Response) => {
        const contactTypes: ContactTypeModel[] = response.json();
        return contactTypes;
      }
    );
  }

}
