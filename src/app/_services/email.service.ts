import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {ToastsManager} from "ng2-toastr";
import {LanguageService} from "./language.service";

@Injectable()
export class EmailService {

  URL = 'http://localhost:8080/email';
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private toastr: ToastsManager,
              private http: Http,
              private languageService: LanguageService,
              private authenticationService: AuthenticationService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }


  sendEmail(applicantId: number, content: string) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(content);
    this.http.post(this.URL + '/' + applicantId, body, options).map(
      (response: Response) => {
        if (this.language == 'en') {
          this.toastr.success("Email successfully sent.");
        } else {
          // prevest
          this.toastr.success("Email successfully sent.");
        }
      }
    ).subscribe();
  }

}
