import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {TOKEN_NAME} from './auth.constant';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {UserModel} from '../_models/user.model';
import {AuthenticationService} from './authentication.service';
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {LanguageService} from "./language.service";
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;
  userUsername: string;
  usersURL = 'http://localhost:8080/users';
  language = 'en';

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });


  constructor(private toastr: ToastsManager,
              private router: Router,
              private http: Http,
              private authenticationService: AuthenticationService,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    this.userUsername = decodedToken.user_name;
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN');
    this.accessToken = accessToken;
    localStorage.setItem(TOKEN_NAME, accessToken);
    if (this.language == 'en') {
      this.toastr.success("Successfull authentication");
    } else {
      this.toastr.success("تم التحقق من صحة الهوية");
    }

    this.router.navigateByUrl('/dashboard');
  }


  register(newUser: UserModel) {
      const headers = new Headers({'Content-type': 'application/json'});
      const options = new RequestOptions({headers: headers});
      return this.http.post(this.usersURL + '/add', newUser, options ).map(
        (response: Response) => {
          return response.statusText;
        }
      )

  }

  resetPassword(email: string) {
    return this.http.get(this.usersURL + '/resetPassword/' + email)
      .map(
        (response: Response) => {
          return response.text();
        }
      )
      .subscribe(response => {
        this.purge();
        this.toastr.success(response);
      })
  }

  purge() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  logout() {
    this.purge();
    if (this.language == 'en') {
      this.toastr.info("Logged out");
    } else {
      this.toastr.info("تم تسجيل الخروج");
    }

    this.router.navigateByUrl('/login');
  }

  isAdminUser(): boolean {
    this.accessToken = this.authenticationService.getToken().toString();
    const decodedToken = this.jwtHelper.decodeToken(this.accessToken);
    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN');
    return this.accessToken && this.isAdmin;
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
    const headers = this.headers;
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.usersURL + '/' + username, options).map(
    (response: Response) => {
        const user: UserModel = response.json();
        return user;
    });
  }

  comparePassword(password: string, userId: string) {
    const headers = this.headers;
    const options = new RequestOptions({ headers: headers, params: {'password': password}});
    return this.http.get(this.usersURL + '/passwordOf/' + userId, options).map(
      (response) => {
        return response.json();
      }
    );
  }

  updatePassword(password: string, userId: string) {
    const headers = this.headers;
    const options = new RequestOptions({ headers: headers});
    const body = password;
    return this.http.put(this.usersURL + '/passwordOf/' + userId, body, options).map(
      (response) => {
        return response;
      }
    ).subscribe(
      response => {
        if (this.language == 'en') {
          this.toastr.success("Password successfully changed.");
        } else {
          this.toastr.success("TRANSLATE");
        }
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }

  updateUser(user: UserModel) {
    const headers = this.headers;
    const body = JSON.stringify(user);
    return this.http.put(this.usersURL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        if (this.language == 'en') {
          this.toastr.success("User Account successfully updated.");
        } else {
          this.toastr.success("translation needed");
        }
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }


  saveImage(fileInput: any) {
    if (fileInput != null) {
      const file: File = fileInput;
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.authenticationService.getToken());
      const options = new RequestOptions({ headers: headers });
      return this.http.post(environment.apiURL + '/uploadFile', formData, options).map(
        (response: Response) => {
          return response.text();
        }
      )
    }
  }

}
