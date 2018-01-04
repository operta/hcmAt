import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {DocumentTypeModel} from "../_models/documentType.model";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class DocumentTypesService {

  URL = 'http://localhost:8080/documentTypes';


  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getDocumentTypes() {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.URL, options).map(
      (response: Response) => {
        const documentTypes: DocumentTypeModel[] = response.json();
        return documentTypes;
      }
    );
  }

}


