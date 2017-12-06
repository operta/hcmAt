import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {TOKEN_NAME} from './auth.constant';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {UserModel} from '../_models/user.model';
import {UserStatus} from '../_models/userStatus.model';
import {UserStatusService} from './userStatus.service';
import {AuthenticationService} from './authentication.service';
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";



@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;
  userUsername: string;
  usersURL = 'http://localhost:8080/users';

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });


  constructor(private toastr: ToastsManager, private router: Router, private http: Http, private authenticationService: AuthenticationService) {
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);
    this.userUsername = decodedToken.user_name;
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN');
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_NAME, accessToken);
  }


  register(newUser: UserModel) {
      const headers = new Headers({'Content-type': 'application/json'});
      const options = new RequestOptions({headers: headers});
      this.http.post(this.usersURL + '/add', newUser, options ).map(
        (response: Response) => {
          // console.log(response);
        }
      ).subscribe(
        response => {
          this.toastr.success("Your account was successfully created.")
        },
        error => {
          this.toastr.success(error.status, "An error occured.")
        }
      );
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/login']);
  }

  isAdminUser(): boolean {
    this.accessToken = this.authenticationService.getToken().toString();
    const decodedToken = this.jwtHelper.decodeToken(this.accessToken);
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN');
    return this.accessToken &&this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }

  getUsername(): string {
    const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
    return decodedToken.user_name;
  }

  getUsers() {
    this.http.get(this.usersURL).map(res => res.json());
  }

  getUser() {
    const username = this.getUsername();
    // console.log(this.authenticationService.getToken());
    const headers = this.headers;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.usersURL + '/' + username, options).map(
    (response: Response) => {
        const user: UserModel = response.json();
        return user;
    });
  }

}
