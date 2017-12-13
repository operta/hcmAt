import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {UserModel} from "../_models/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subscriptionRoute: Subscription;
  user: UserModel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptionRoute= this.route.data.subscribe(
      (data: {user: UserModel}) => {
        this.user = data.user;
      }
    );
  }

  ngOnDestroy(){
    this.subscriptionRoute.unsubscribe();
  }

}
