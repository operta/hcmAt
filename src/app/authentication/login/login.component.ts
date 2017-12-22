import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {UserService} from "../../_services/user.service";
import {ToastsManager} from "ng2-toastr";
import {LanguageService} from "../../_services/language.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;
  language = 'en';

  constructor(private router: Router,
              private toastr: ToastsManager,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private languageService: LanguageService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit(): void {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
    this.userService.purge();
  }

  login() {
    this.userService.purge();
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        (result: any) => {
          this.loading = false;

          if (result) {
            this.userService.login(result);

          } else {
            if (this.language == 'en') {
              this.error = 'Username or password is incorrect';
            }
            else {
              this.error = 'Translation missing';
            }

          }
        },
        error => {
          if (this.language == 'en') {
            this.error = 'Username or password is incorrect';
          }
          else {
            this.error = 'Translation missing';
          }
          this.loading = false;
        }
      );
  }

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
