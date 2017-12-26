import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {UserService} from "../../_services/user.service";
import {UserModel} from "../../_models/user.model";
import {UserStatus} from "../../_models/userStatus.model";
import {UserStatusService} from "../../_services/userStatus.service";
import {ToastsManager} from "ng2-toastr";
import {LanguageService} from "../../_services/language.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;
  userStatuses: UserStatus[];
  language = 'en';

  constructor(private router: Router,
              private toastr: ToastsManager,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private userStatusService: UserStatusService,
              private languageService: LanguageService) {
    this.userStatusService.getUserStatuses().subscribe(
      (data: UserStatus[]) => {
        this.userStatuses = data;
      }
    );
  }

  ngOnInit() {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  register() {
    this.loading = true;

    if (this.model.password != this.model.passwordc) {
      if (this.language == 'en') {
        this.error = 'Passwords do not match';
      } else {
        // PROMIJENITI OVDJE
        this.error = 'Passwords do not match';
      }

      this.loading = false;
    } else {

      const newUser = new UserModel(
        null,
        this.model.username,
        this.model.password,
        this.model.email,
        'USER',
        this.userStatuses[0],
        null,
        null,
        null,
        null,
        null
      );

      this.userService.register(newUser).subscribe(
        (status: any) => {
          if (status == true) {
            if (this.language == 'en') {
              this.toastr.success("Successful registration");
            } else {
              // PROMIJENITI OVDJE
              this.toastr.success("Successful registration");
            }

            this.navigateAfterSuccess();
          }
          else{
            this.loading = false;
            if (this.language == 'en') {
              this.toastr.error("Username already exists");
            } else {
              // PROMIJENITI OVDJE
              this.toastr.error("Username already exists");
            }

          }
        }
      );

       //

    }
  }

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }


  private navigateAfterSuccess() {
      this.router.navigateByUrl('/login');
  }

}
