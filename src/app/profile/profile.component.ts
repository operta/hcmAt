import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {UserModel} from "../_models/user.model";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {LanguageService} from "../_services/language.service";
import {environment} from "../../environments/environment";
import {async} from "rxjs/scheduler/async";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  error: string;
  state: string;
  language = 'en';
  constructor(private userService: UserService, private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
    this.state = "profile";
     this.userService.getUser().subscribe(
      (data: UserModel) => {
        this.user = data;

      },
      error => console.log(error)
    )
  }

  onSubmit(form: NgForm) {
    this.user.email = form.value.email;
    this.user.username = form.value.username;
    this.userService.updateUser(this.user);
  }

  onSubmitPassword(form: NgForm) {
    this.userService.comparePassword(form.value.currentPassword, this.user.id).subscribe(
      response => {
        if (response) {
          if (form.value.password1 == form.value.password2) {
            this.userService.updatePassword(form.value.password1, this.user.id);
            form.resetForm();
          } else {
            if (this.language == 'en') {
              this.error = 'New password must match';
            } else {
              this.error = "Translation needed";
            }
          }
        } else {
          if (this.language == 'en') {
            this.error = 'Current password invalid';
          } else {
            this.error = "Translation needed";
          }
        }
      }
    );
  }

  onFileChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();

      reader.onload = ((e) => {
        this.user.image_path = e.target['result'];
      });

      reader.readAsDataURL(fileInput.target.files[0]);

      this.userService.saveImage(fileInput.target.files[0]).subscribe((fileName: string) => {
        const userCopy = new UserModel(this.user.id, this.user.username, this.user.password, this.user.email, this.user.role, this.user.id_status,
          this.user.created_by, this.user.created_at, this.user.updated_by, new Date, environment.storagePath + fileName)
        this.userService.updateUser(userCopy);
      });
    }
  }

}
