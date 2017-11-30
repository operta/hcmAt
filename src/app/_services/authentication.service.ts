import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from '@angular/http';
import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from "./auth.constant";
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  jwtHelper: JwtHelper = new JwtHelper();
  static AUTH_TOKEN = 'http://localhost:8080/oauth/token';

  constructor(private http: Http) {
  }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
      .map((res:any) => {
        if (res.json().access_token) {
          return res.json().access_token;
        }
        return null;
      });
  }

  getToken(): String {
    return localStorage.getItem('access_token');
  }

}
