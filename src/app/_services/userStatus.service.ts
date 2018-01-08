import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {UserStatus} from "../_models/userStatus.model";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UserStatusService {

  userStatusURL = 'http://localhost:8080/userStatuses';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getUserStatuses() {
    const headers = this.authHeaders;
    return this.http.get(this.userStatusURL, {headers: headers}).map(
      (response: any) => {
        const userStatuses: UserStatus[] = response.json();
        return userStatuses;
      }
    );
  }
}
