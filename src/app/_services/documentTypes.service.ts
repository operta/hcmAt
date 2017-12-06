import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {DocumentTypeModel} from "../_models/documentType.model";

@Injectable()
export class DocumentTypesService {

  URL = 'http://localhost:8080/documentTypes';

  constructor(private http: Http) { }

  getDocumentTypes() {
    return this.http.get(this.URL).map(
      (response: Response) => {
        const documentTypes: DocumentTypeModel[] = response.json();
        return documentTypes;
      }
    );
  }

}
