import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {UserService} from "../../_services/user.service";
import {ToastsManager} from "ng2-toastr";

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

  constructor(private router: Router,
              private toastr: ToastsManager,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit(): void {
    this.userService.purge();
  }

  login() {
    this.userService.purge();
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        (result: any)=> {
          this.loading = false;

          if (result) {
            this.userService.login(result);

          } else {
            this.error = 'Username or password is incorrect';
          }
        },
        error => {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      );
  }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
