
import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {DocumentLinkModel} from "../_models/documentLink.model";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class DocumentLinksService {
  private Documents: DocumentLinkModel[];

  DocumentsURL = 'http://localhost:8080/documentLinks';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getDocuments() {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.get(this.DocumentsURL, options).map(
      (response: Response) => {
        const documents: DocumentLinkModel[] = response.json();
        return documents;
      }
    );
  }

  getDocument(id: string) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.DocumentsURL + '/' + id, options).map(
      (response: Response) => {
        const document: DocumentLinkModel = response.json();
        return document;
      }
    );
  }

  addDocument(Document: DocumentLinkModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(Document);
    return this.http.post(this.DocumentsURL + '/add', body, options).map(
      (response: Response) => {
        const document: DocumentLinkModel = response.json();
        return document;
      }
    )
  }

  updateDocument(Document: DocumentLinkModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(Document);
    return this.http.put(this.DocumentsURL, body, options)
      .map((response: Response) => response.json());
  }

}

