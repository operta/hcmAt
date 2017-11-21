import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {UserStatus} from "../_models/userStatus.model";

@Injectable()
export class UserStatusService {

  userStatusURL = 'http://localhost:8080/userStatuses';

  constructor(private http: Http) { }

  getUserStatuses() {
    return this.http.get(this.userStatusURL).map(
      (response: any) => {
        const userStatuses: UserStatus[] = response.json();
        console.log(userStatuses);
        return userStatuses;
      }
    );
  }
}
