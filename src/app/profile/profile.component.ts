import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {UserModel} from "../_models/user.model";
import {FormControl, FormGroup, NgForm} from "@angular/forms";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  password1: string;
  password2: string;
  state: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.state ="profile";
    this.userService.getUser().subscribe(
      (data: UserModel) => {
        this.user = data;
        console.log(this.user);

      },
      error => console.log(error)
    )
  }

  onSubmit(form: NgForm){
    this.user.username = form.value.email;
    console.log(form.value);

  }

  onSubmitPassword(form: NgForm){
    if(form.value.password1 != null){
      if(form.value.password2 != null){
        if(form.value.password1 == form.value.password2){
          this.user.password = form.value.password1;
        }
        else{
          console.log("Password do not match")
        }
      }
      else {
        console.log("To change password please eneter it two times")
      }
    }
    console.log(form.value);
    console.log(this.user);
  }

}
