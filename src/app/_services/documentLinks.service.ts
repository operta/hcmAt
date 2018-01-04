
import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {DocumentLinkModel} from "../_models/documentLink.model";

@Injectable()
export class DocumentLinksService {
  private Documents: DocumentLinkModel[];

  DocumentsURL = 'http://77.78.198.19:8080/documentLinks';

  constructor(private http: Http) { }

  getDocuments() {
    this.http.get(this.DocumentsURL).map(
      (response: Response) => {
        const documents: DocumentLinkModel[] = response.json();
        return documents;
      }
    );
  }

  getDocument(id: string) {
    return this.http.get(this.DocumentsURL + '/' + id).map(
      (response: Response) => {
        const document: DocumentLinkModel = response.json();
        return document;
      }
    );
  }

  addDocument(Document: DocumentLinkModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(Document);
    return this.http.post(this.DocumentsURL + '/add', body, options).map(
      (response: Response) => {
        const document: DocumentLinkModel = response.json();
        console.log(document);
        return document;
      }
    )
  }

  updateDocument(Document: DocumentLinkModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(Document);
    return this.http.put(this.DocumentsURL, body, options)
      .map((response: Response) => response.json());
  }

}
