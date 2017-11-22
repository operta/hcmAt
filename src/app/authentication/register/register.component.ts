import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {UserService} from "../../_services/user.service";
import {UserModel} from "../../_models/user.model";
import {UserStatus} from "../../_models/userStatus.model";
import {UserStatusService} from "../../_services/userStatus.service";

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

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private userStatusService: UserStatusService) {
    this.userStatusService.getUserStatuses().subscribe(
      (data: UserStatus[]) => {
        this.userStatuses = data;
      }
    );
  }

  ngOnInit(){}

  register() {
    this.loading = true;

    if(this.model.password != this.model.passwordc)
    {
      this.error = 'Passwords do not match';
      this.loading = false;
    }
    else {

      var newUser = new UserModel(
        null,
        this.model.name,
        this.model.email,
        this.model.password,
        'USER',
        this.userStatuses[0],
        null,
        null,
        null,
        null
      );

      console.log(newUser);
      this.userService.register(newUser);
      this.navigateAfterSuccess();
    }
  }

  private navigateAfterSuccess() {
      this.router.navigate(['/login']);
  }

}
